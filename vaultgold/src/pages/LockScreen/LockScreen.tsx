import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import {
  verifyMasterPassword,
  unlockVault,
} from "../../utils/masterPassword";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function unlock() {
    setError("");

    if (!password) {
      setError("Please enter your master password.");
      return;
    }

    if (verifyMasterPassword(password)) {
      unlockVault();
      navigate("/");
    } else {
      setError("Incorrect master password.");
      setPassword("");
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      unlock();
    }
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-white">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-800 bg-[#101827] p-8 md:flex">
        <div>
          <h1 className="text-3xl font-bold text-[#D4AF37]">VaultGold</h1>
          <p className="mt-1 text-sm text-gray-400">Secure Password Manager</p>
        </div>

        <div className="mt-10 rounded-2xl bg-[#1f2b3c] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-bold">
              K
            </div>
            <div>
              <h2 className="font-semibold text-white">Keanu</h2>
              <p className="text-sm text-gray-400">Vault Owner</p>
            </div>
          </div>
        </div>

        <div className="mt-auto rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-4 text-sm text-gray-300">
          <div className="mb-3 flex items-center gap-2 text-[#D4AF37]">
            <FiShield size={18} />
            <span className="font-semibold">Vault locked</span>
          </div>
          Your passwords remain encrypted until you unlock the vault.
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center md:hidden">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20">
              <FiShield size={32} />
            </div>
            <h1 className="text-3xl font-bold text-[#D4AF37]">VaultGold</h1>
            <p className="mt-2 text-sm text-gray-400">Secure Password Manager</p>
          </div>

          <div className="rounded-3xl border border-gray-700 bg-[#1f2b3c] p-8 shadow-2xl shadow-black/30 sm:p-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                <FiLock size={36} />
              </div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white">Unlock Vault</h2>
              <p className="mt-2 text-gray-400">
                Enter your master password to continue.
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-200">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your master password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full rounded-2xl border border-gray-600 bg-[#030712] px-4 py-4 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#D4AF37]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={unlock}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] py-4 font-semibold text-white shadow-md shadow-[#D4AF37]/20 transition hover:bg-[#C19B2E] hover:shadow-lg active:scale-[0.98]"
            >
              <FiLock size={19} />
              Unlock Vault
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
              <FiShield size={14} />
              <span>Your vault is protected locally on this device.</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-600">
            VaultGold - Secure Password Management
          </p>
        </div>
      </main>
    </div>
  );
}