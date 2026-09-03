import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiStar,
  FiSave,
  FiX,
} from "react-icons/fi";

import PageHeader from "../../components/PageHeader/PageHeader";
import GlassCard from "../../components/GlassCard/GlassCard";

import {
  addPassword,
  updatePassword,
  getPasswordById,
} from "../../database/passwordService";

import { generatePassword } from "../../utils/passwordGenerator";
import { getPasswordStrength } from "../../utils/passwordStrength";
import { encrypt, decrypt } from "../../utils/cryptoService";

export default function SavePassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [website, setWebsite] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");

  const [category, setCategory] = useState("General");
  const [favorite, setFavorite] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(password);

  useEffect(() => {
    if (id) {
      loadPassword(Number(id));
    }
  }, [id]);

  async function loadPassword(passwordId: number) {
    const item = await getPasswordById(passwordId);

    if (!item) return;

    setWebsite(item.website);
    setUrl(item.url ?? "");
    setUsername(item.username);
    setNotes(item.notes ?? "");

    setCategory(item.category ?? "General");
    setFavorite(item.favorite ?? false);

    const masterPassword =
      localStorage.getItem("masterPassword");

    if (!masterPassword) {
      alert("Master password not found.");
      return;
    }

    try {
      const decryptedPassword = await decrypt(
        item.password,
        masterPassword
      );

      setPassword(decryptedPassword);
    } catch (error) {
      console.error(error);
      alert("Failed to decrypt password.");
    }
  }

  async function handleSave() {
    if (!website || !username || !password) {
      alert(
        "Please fill in Website, Username and Password."
      );
      return;
    }

    try {
      const masterPassword =
        localStorage.getItem("masterPassword");

      if (!masterPassword) {
        alert("Master password not found.");
        return;
      }

      const encryptedPassword = await encrypt(
        password,
        masterPassword
      );

      const passwordData = {
        website,
        url,
        username,
        password: encryptedPassword,
        notes,
        category,
        favorite,
        createdAt: new Date(),
      };

      if (isEditing) {
        await updatePassword(
          Number(id),
          passwordData
        );

        alert("Password updated!");
      } else {
        await addPassword(passwordData);

        alert("Password saved!");
      }

      navigate("/vault");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  const inputClass = `
    w-full
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-4
    text-gray-900
    outline-none
    transition-all
    duration-200

    placeholder:text-gray-400

    focus:border-[#D4AF37]
    focus:ring-2
    focus:ring-[#D4AF37]/20

    dark:border-gray-700
    dark:bg-gray-900
    dark:text-white
    dark:placeholder:text-gray-500
    dark:focus:border-[#D4AF37]
    dark:focus:ring-[#D4AF37]/20
  `;

  const labelClass = `
    mb-2
    block
    text-sm
    font-semibold
    text-gray-800
    dark:text-gray-200
  `;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={
          isEditing
            ? "Edit Password"
            : "Save Password"
        }
        subtitle={
          isEditing
            ? "Update your stored credentials securely."
            : "Securely store your credentials on this device."
        }
      />

      <GlassCard className="space-y-7">
        {/* Website */}
        <div>
          <label className={labelClass}>
            Website / App
          </label>

          <input
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
            placeholder="Google"
            className={inputClass}
          />
        </div>

        {/* URL */}
        <div>
          <label className={labelClass}>
            Website URL
          </label>

          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder="https://google.com"
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className={inputClass}
          >
            <option>General</option>
            <option>Social</option>
            <option>Work</option>
            <option>Banking</option>
            <option>Shopping</option>
            <option>Gaming</option>
            <option>Other</option>
          </select>
        </div>

        {/* Username */}
        <div>
          <label className={labelClass}>
            Email / Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>
            Password
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-xl
                  text-gray-500
                  transition

                  hover:bg-gray-100
                  hover:text-[#D4AF37]

                  dark:text-gray-400
                  dark:hover:bg-gray-800
                  dark:hover:text-[#D4AF37]
                "
                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                setPassword(generatePassword())
              }
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
                transition-all
                hover:bg-[#C19B2E]
                hover:shadow-md
              "
            >
              <FiRefreshCw size={18} />
              Generate
            </button>
          </div>

          {/* Strength */}
          <div
            className="
              mt-4
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              p-4

              dark:border-gray-700
              dark:bg-gray-900/60
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Password strength
              </span>

              <span className="font-semibold text-gray-900 dark:text-white">
                {strength.label}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#D4AF37]
                  transition-all
                  duration-500
                "
                style={{
                  width:
                    strength.label === "Weak"
                      ? "25%"
                      : strength.label ===
                        "Medium"
                      ? "50%"
                      : strength.label ===
                        "Strong"
                      ? "75%"
                      : "100%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Favourite */}
        <div>
          <label className={labelClass}>
            Favourite
          </label>

          <button
            type="button"
            onClick={() =>
              setFavorite(!favorite)
            }
            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-5
              py-3
              font-semibold
              transition-all

              ${
                favorite
                  ? `
                    bg-[#D4AF37]
                    text-white
                    shadow-md
                    hover:bg-[#C19B2E]
                  `
                  : `
                    border
                    border-gray-300
                    bg-white
                    text-gray-700
                    hover:bg-gray-100

                    dark:border-gray-600
                    dark:bg-gray-800
                    dark:text-gray-200
                    dark:hover:bg-gray-700
                  `
              }
            `}
          >
            <FiStar
              size={18}
              className={
                favorite
                  ? "fill-white"
                  : ""
              }
            />

            {favorite
              ? "Favourite"
              : "Add Favourite"}
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className={labelClass}>
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Add any notes about this account..."
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Buttons */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-200
            pt-6

            dark:border-gray-700

            sm:flex-row
          "
        >
          <button
            type="button"
            onClick={() =>
              navigate("/vault")
            }
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-gray-300
              bg-white
              px-6
              py-4
              font-semibold
              text-gray-700
              transition-all

              hover:bg-gray-100

              dark:border-gray-600
              dark:bg-gray-800
              dark:text-gray-200
              dark:hover:bg-gray-700
            "
          >
            <FiX size={18} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#D4AF37]
              px-6
              py-4
              font-semibold
              text-white
              shadow-sm
              transition-all

              hover:bg-[#C19B2E]
              hover:shadow-lg
            "
          >
            <FiSave size={18} />

            {isEditing
              ? "Update Password"
              : "Save Password"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}