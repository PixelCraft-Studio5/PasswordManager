import { useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiShield,
  FiCheck,
  FiX,
} from "react-icons/fi";

import {
  saveMasterPassword,
  unlockVault,
} from "../../utils/masterPassword";

export default function SetupMasterPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Password requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const requirementsMet = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  const passwordsMatch =
    password.length > 0 &&
    confirm.length > 0 &&
    password === confirm;

  function handleSetup() {
    setError("");

    if (password.length < 8) {
      setError(
        "Your master password must be at least 8 characters long."
      );
      return;
    }

    if (!hasUppercase) {
      setError(
        "Your master password must contain at least one uppercase letter."
      );
      return;
    }

    if (!hasLowercase) {
      setError(
        "Your master password must contain at least one lowercase letter."
      );
      return;
    }

    if (!hasNumber) {
      setError(
        "Your master password must contain at least one number."
      );
      return;
    }

    if (!hasSpecial) {
      setError(
        "Your master password must contain at least one special character."
      );
      return;
    }

    if (password !== confirm) {
      setError("Your passwords do not match.");
      return;
    }

    saveMasterPassword(password);
    unlockVault();

    navigate("/");
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleSetup();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-10 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <div className="w-full max-w-lg">

        {/* Branding */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20">
            <FiShield size={32} />
          </div>

          <h1 className="text-3xl font-bold text-[#D4AF37]">
            VaultGold
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Secure Password Manager
          </p>

        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/30">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] dark:bg-[#D4AF37]/15">
              <FiLock size={36} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Master Password
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your master password protects your entire
              VaultGold vault. Make sure it is strong and
              something you can remember.
            </p>

          </div>

          {/* Master Password */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Master Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-4
                  pr-12
                  [appearance:textfield]
                  text-gray-900
                  outline-none
                  transition

                  placeholder:text-gray-400

                  focus:border-[#D4AF37]
                  focus:ring-2
                  focus:ring-[#D4AF37]/20

                  dark:border-gray-600
                  dark:bg-gray-900
                  dark:text-white
                  dark:placeholder:text-gray-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition hover:text-[#D4AF37]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>

            </div>

          </div>

          {/* Password Strength */}
          {password.length > 0 && (
            <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Password Strength
                </span>

                <span
                  className={`text-sm font-semibold ${
                    requirementsMet <= 2
                      ? "text-red-500"
                      : requirementsMet <= 4
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {requirementsMet <= 2
                    ? "Weak"
                    : requirementsMet <= 4
                    ? "Good"
                    : "Strong"}
                </span>

              </div>

              {/* Strength Bar */}
              <div className="mb-4 flex gap-1">

                {[1, 2, 3, 4, 5].map(
                  (level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        level <= requirementsMet
                          ? requirementsMet <= 2
                            ? "bg-red-500"
                            : requirementsMet <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )
                )}

              </div>

              {/* Requirements */}
              <div className="grid gap-2 sm:grid-cols-2">

                <Requirement
                  met={hasMinLength}
                  text="At least 8 characters"
                />

                <Requirement
                  met={hasUppercase}
                  text="Uppercase letter"
                />

                <Requirement
                  met={hasLowercase}
                  text="Lowercase letter"
                />

                <Requirement
                  met={hasNumber}
                  text="Number"
                />

                <Requirement
                  met={hasSpecial}
                  text="Special character"
                />

              </div>

            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Confirm Master Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                className={`
                  w-full
                  rounded-2xl
                  border
                  bg-gray-50
                  px-4
                  py-4
                  pr-20
                  text-gray-900
                  outline-none
                  transition

                  dark:bg-gray-900
                  dark:text-white
                  dark:placeholder:text-gray-500

                  focus:ring-2
                  focus:ring-[#D4AF37]/20

                  ${
                    confirm.length > 0
                      ? passwordsMatch
                        ? "border-green-500 focus:border-green-500"
                        : "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#D4AF37] dark:border-gray-600"
                  }
                `}
              />

              {/* Match Icon */}
              {confirm.length > 0 && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">

                  {passwordsMatch ? (
                    <FiCheck
                      className="text-green-500"
                      size={20}
                    />
                  ) : (
                    <FiX
                      className="text-red-500"
                      size={20}
                    />
                  )}

                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#D4AF37]"
                aria-label={
                  showConfirm
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
              >
                {showConfirm ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Create Vault */}
          <button
            type="button"
            onClick={handleSetup}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#D4AF37]
              py-4
              font-semibold
              text-white
              shadow-md
              shadow-[#D4AF37]/20
              transition

              hover:bg-[#C19B2E]
              hover:shadow-lg
              hover:shadow-[#D4AF37]/20

              active:scale-[0.98]
            "
          >
            <FiLock size={19} />
            Create Vault
          </button>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900">

            <FiShield
              className="mt-0.5 shrink-0 text-[#D4AF37]"
              size={18}
            />

            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
              Your master password is used to protect
              your vault locally. Make sure you remember
              it, because it cannot be recovered if lost.
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          VaultGold • Secure Password Management
        </p>

      </div>
    </div>
  );
}

/* Password Requirement Component */

interface RequirementProps {
  met: boolean;
  text: string;
}

function Requirement({
  met,
  text,
}: RequirementProps) {
  return (
    <div
      className={`flex items-center gap-2 text-xs transition-colors ${
        met
          ? "text-green-600 dark:text-green-400"
          : "text-gray-400 dark:text-gray-500"
      }`}
    >
      {met ? (
        <FiCheck size={14} />
      ) : (
        <FiX size={14} />
      )}

      <span>{text}</span>
    </div>
  );
}