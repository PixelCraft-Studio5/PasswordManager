import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDownload,
  FiLock,
  FiMoon,
  FiRefreshCw,
  FiShield,
  FiSun,
  FiUpload,
} from "react-icons/fi";
import PageHeader from "../../components/PageHeader/PageHeader";
import GlassCard from "../../components/GlassCard/GlassCard";
import { exportVault, importVault } from "../../database/backupService";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStatus, setBackupStatus] = useState("");

  function lockVault() {
    sessionStorage.removeItem("vaultUnlocked");
    navigate("/lock");
  }

  function logout() {
    localStorage.removeItem("masterPassword");
    sessionStorage.removeItem("vaultUnlocked");
    navigate("/setup-master-password");
  }

  async function handleExport() {
    await exportVault();
    setBackupStatus("Backup downloaded successfully.");
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;

    try {
      await importVault(file);
      setBackupStatus("Vault restored successfully.");
    } catch {
      setBackupStatus("That backup file could not be restored.");
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Manage your VaultGold preferences."
      />

      <div className="grid gap-8 xl:grid-cols-2">
        <GlassCard className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <FiShield size={23} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Security</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Protect access to your local vault.
              </p>
            </div>
          </div>

          <button
            onClick={lockVault}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600"
          >
            <FiLock size={18} />
            Lock Vault
          </button>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <FiRefreshCw size={18} />
            Reset Master Password
          </button>
        </GlassCard>

        <GlassCard className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500">
              {darkMode ? <FiMoon size={23} /> : <FiSun size={23} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Appearance</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose how VaultGold looks on this device.
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
          >
            <span className="font-semibold">Dark mode</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {darkMode ? "On" : "Off"}
            </span>
          </button>
        </GlassCard>

        <GlassCard className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15 text-green-500">
              <FiDownload size={23} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Backup & Restore</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Keep an encrypted copy of your vault data.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <FiDownload size={18} />
              Export Vault
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-gray-50 py-3 font-semibold text-gray-700 transition hover:border-[#D4AF37] dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              <FiUpload size={18} />
              Restore Backup
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => handleImport(event.target.files?.[0])}
          />
          {backupStatus && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {backupStatus}
            </p>
          )}
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <FiShield size={23} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">About VaultGold</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                A local-first password manager built with React, TypeScript,
                and IndexedDB.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400">Version 1.0.0</p>
        </GlassCard>
      </div>
    </div>
  );
}