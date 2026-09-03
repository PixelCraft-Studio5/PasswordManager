import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiKey,
  FiStar,
  FiShield,
} from "react-icons/fi";

import PageHeader from "../../components/PageHeader/PageHeader";
import PasswordCard from "../../components/PasswordCard/PasswordCard";

import {
  getPasswords,
  deletePassword,
  toggleFavorite,
} from "../../database/passwordService";

import type { PasswordItem } from "../../database/db";

export default function Vault() {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    loadPasswords();
  }, []);

  async function loadPasswords() {
    const data = await getPasswords();
    setPasswords(data);
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this password?"
    );

    if (!confirmed) return;

    await deletePassword(id);
    await loadPasswords();
  }

  async function handleFavorite(id: number) {
    await toggleFavorite(id);
    await loadPasswords();
  }

  function handleEdit(id: number) {
    navigate(`/edit-password/${id}`);
  }

  const categories = [
    "All",
    "General",
    "Social",
    "Work",
    "Banking",
    "Shopping",
    "Gaming",
    "Other",
  ];

  const filteredPasswords = passwords
    .filter((item) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        item.website.toLowerCase().includes(text) ||
        item.username.toLowerCase().includes(text);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort(
      (a, b) =>
        Number(b.favorite) -
        Number(a.favorite)
    );

  const favoriteCount = passwords.filter(
    (item) => item.favorite
  ).length;

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <PageHeader
          title="Vault"
          subtitle="Manage all your saved passwords."
        />

        <button
          onClick={() => navigate("/save-password")}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[#D4AF37]
            px-5
            py-3
            font-semibold
            text-white
            shadow-md
            shadow-[#D4AF37]/20
            transition

            hover:bg-[#C19B2E]
            hover:shadow-lg
            hover:shadow-[#D4AF37]/20

            active:scale-95
          "
        >
          <FiPlus size={19} />
          Add Password
        </button>

      </div>

      {/* Vault Overview */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] dark:bg-[#D4AF37]/15">
            <FiKey size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Passwords
            </p>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {passwords.length}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500 dark:bg-yellow-400/15">
            <FiStar size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Favourites
            </p>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {favoriteCount}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500 dark:bg-green-500/15">
            <FiShield size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing
            </p>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredPasswords.length}
            </p>
          </div>

        </div>

      </div>

      {/* Search */}
      <div className="relative mb-5">

        <FiSearch
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search website or username..."
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-white
            py-4
            pl-12
            pr-4
            text-gray-900
            shadow-sm
            outline-none
            transition

            placeholder:text-gray-400

            focus:border-[#D4AF37]
            focus:ring-2
            focus:ring-[#D4AF37]/20

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
            dark:placeholder:text-gray-500
          "
        />

      </div>

      {/* Categories */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setCategoryFilter(category)
            }
            className={`
              shrink-0
              rounded-full
              px-5
              py-2.5
              text-sm
              font-medium
              transition

              ${
                categoryFilter === category
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : `
                    border
                    border-gray-200
                    bg-white
                    text-gray-600
                    hover:border-[#D4AF37]/40
                    hover:bg-[#D4AF37]/10
                    hover:text-[#D4AF37]

                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-gray-300
                    dark:hover:bg-gray-700
                  `
              }
            `}
          >
            {category}
          </button>
        ))}

      </div>

      {/* Results Information */}
      {(search || categoryFilter !== "All") && (
        <div className="mb-5 flex items-center justify-between">

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredPasswords.length}
            </span>{" "}
            password
            {filteredPasswords.length !== 1
              ? "s"
              : ""}
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCategoryFilter("All");
            }}
            className="text-sm font-medium text-[#D4AF37] hover:underline"
          >
            Clear filters
          </button>

        </div>
      )}

      {/* Passwords */}
      {filteredPasswords.length === 0 ? (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-gray-300
            bg-white
            p-12
            text-center
            shadow-sm
            transition-colors
            duration-300

            dark:border-gray-700
            dark:bg-gray-800
          "
        >

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] dark:bg-[#D4AF37]/15">
            <FiKey size={30} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {passwords.length === 0
              ? "Your Vault Is Empty"
              : "No Passwords Found"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-gray-500 dark:text-gray-400">
            {passwords.length === 0
              ? "Start securing your accounts by adding your first password to VaultGold."
              : "Try changing your search or category filter to find what you're looking for."}
          </p>

          {passwords.length === 0 && (
            <button
              onClick={() =>
                navigate("/save-password")
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#D4AF37]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#C19B2E]
                active:scale-95
              "
            >
              <FiPlus size={18} />
              Add Your First Password
            </button>
          )}

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {filteredPasswords.map((item) => (

            <PasswordCard
              key={item.id}
              id={item.id!}
              website={item.website}
              username={item.username}
              password={item.password}
              favorite={item.favorite}
              category={item.category}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onFavorite={handleFavorite}
            />

          ))}

        </div>

      )}

    </div>
  );
}