import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiCopy,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiCheck,
} from "react-icons/fi";

import { decrypt } from "../../utils/cryptoService";

interface PasswordCardProps {
  id: number;
  website: string;
  username: string;
  password: string;
  favorite?: boolean;
  category?: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onFavorite?: (id: number) => void;
}

export default function PasswordCard({
  id,
  website,
  username,
  password,
  favorite = false,
  category = "General",
  onDelete,
  onEdit,
  onFavorite,
}: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [copied, setCopied] = useState("");

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(label);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleShowPassword() {
    try {
      if (!showPassword) {
        const masterPassword =
          localStorage.getItem("masterPassword");

        if (!masterPassword) {
          alert("Master password not found.");
          return;
        }

        const decrypted = await decrypt(
          password,
          masterPassword
        );

        setDecryptedPassword(decrypted);
        setShowPassword(true);
      } else {
        setShowPassword(false);
        setDecryptedPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to decrypt password.");
    }
  }

  async function handleCopyPassword() {
    try {
      const masterPassword =
        localStorage.getItem("masterPassword");

      if (!masterPassword) {
        alert("Master password not found.");
        return;
      }

      const decrypted = await decrypt(
        password,
        masterPassword
      );

      await copy(decrypted, "Password");
    } catch (error) {
      console.error(error);
      alert("Unable to copy password.");
    }
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl

        dark:border-gray-700
        dark:bg-gray-800
        dark:shadow-black/20
        dark:hover:border-gray-600
      "
    >
      {/* Gold accent */}
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-[#B8941F]
          via-[#D4AF37]
          to-[#E8CC72]
          opacity-0
          transition
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#D4AF37]/10
                text-lg
                font-bold
                text-[#D4AF37]
              "
            >
              {website.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {website}
              </h2>

              <p
                className="
                  truncate
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {username}
              </p>
            </div>
          </div>
        </div>

        {/* Category + Favourite */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            className="
              hidden
              rounded-full
              bg-gray-100
              px-3
              py-1
              text-xs
              font-semibold
              text-gray-600
              sm:inline-block

              dark:bg-gray-700
              dark:text-gray-300
            "
          >
            {category}
          </span>

          {onFavorite && (
            <button
              onClick={() => onFavorite(id)}
              title={
                favorite
                  ? "Remove favourite"
                  : "Add favourite"
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition

                hover:bg-gray-100
                hover:text-[#D4AF37]

                dark:hover:bg-gray-700
              "
            >
              <FiStar
                size={20}
                className={
                  favorite
                    ? "fill-[#D4AF37] text-[#D4AF37]"
                    : "text-gray-400 dark:text-gray-500"
                }
              />
            </button>
          )}
        </div>
      </div>

      {/* Category on mobile */}
      <div className="mt-4 sm:hidden">
        <span
          className="
            inline-flex
            rounded-full
            bg-gray-100
            px-3
            py-1
            text-xs
            font-semibold
            text-gray-600

            dark:bg-gray-700
            dark:text-gray-300
          "
        >
          {category}
        </span>
      </div>

      {/* Password */}
      <div className="mt-5">
        <div
          className="
            flex
            min-h-[52px]
            items-center
            justify-between
            gap-3
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3

            dark:border-gray-700
            dark:bg-gray-900/60
          "
        >
          <span
            className="
              min-w-0
              flex-1
              break-all
              font-mono
              text-sm
              text-gray-700

              dark:text-gray-200
            "
          >
            {showPassword
              ? decryptedPassword
              : "••••••••••••"}
          </span>

          <button
            onClick={handleShowPassword}
            title={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-gray-500
              transition

              hover:bg-white
              hover:text-[#D4AF37]

              dark:hover:bg-gray-800
              dark:hover:text-[#D4AF37]
            "
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Copied notification */}
      {copied && (
        <div
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-100
            px-3
            py-2
            text-sm
            font-semibold
            text-green-700

            dark:bg-green-900/30
            dark:text-green-400
          "
        >
          <FiCheck size={16} />
          {copied} copied!
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {/* Copy Username */}
        <button
          onClick={() =>
            copy(username, "Username")
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-700
            transition

            hover:border-blue-400
            hover:bg-blue-50
            hover:text-blue-600

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-300
            dark:hover:bg-blue-900/20
            dark:hover:text-blue-400
          "
        >
          <FiCopy size={16} />
          Username
        </button>

        {/* Copy Password */}
        <button
          onClick={handleCopyPassword}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#D4AF37]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-[#C19B2E]
            hover:shadow-md
          "
        >
          <FiCopy size={16} />
          Password
        </button>

        {/* Show / Hide */}
        <button
          onClick={handleShowPassword}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-700
            transition

            hover:bg-gray-100

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-300
            dark:hover:bg-gray-700
          "
        >
          {showPassword ? (
            <FiEyeOff size={16} />
          ) : (
            <FiEye size={16} />
          )}

          {showPassword ? "Hide" : "Show"}
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(id)}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            px-4
            py-2.5
            text-sm
            font-semibold
            text-blue-600
            transition

            hover:bg-blue-100

            dark:border-blue-900
            dark:bg-blue-900/20
            dark:text-blue-400
            dark:hover:bg-blue-900/40
          "
        >
          <FiEdit2 size={16} />
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(id)}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-2.5
            text-sm
            font-semibold
            text-red-600
            transition

            hover:bg-red-100

            dark:border-red-900
            dark:bg-red-900/20
            dark:text-red-400
            dark:hover:bg-red-900/40
          "
        >
          <FiTrash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}