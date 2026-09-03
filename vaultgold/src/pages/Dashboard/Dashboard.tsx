import { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import QuickActions from "../../components/QuickActions/QuickActions";
import StatCard from "../../components/StatCard/StatCard";
import GlassCard from "../../components/GlassCard/GlassCard";
import SecurityScore from "../../components/SecurityScore/SecurityScore";

import {
  getPasswords,
  getPasswordCount,
  getWeakPasswordCount,
} from "../../database/passwordService";

import type { PasswordItem } from "../../database/db";

import {
  exportVault,
  importVault,
} from "../../database/backupService";
import { FaLock } from "react-icons/fa6";

export default function Dashboard() {
  const [totalPasswords, setTotalPasswords] = useState(0);
  const [weakPasswords, setWeakPasswords] = useState(0);
  const [recentPasswords, setRecentPasswords] = useState<PasswordItem[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const total = await getPasswordCount();
      const weak = await getWeakPasswordCount();
      const passwords = await getPasswords();

      setTotalPasswords(total);
      setWeakPasswords(weak);

      setRecentPasswords(
        [...passwords]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    }
  }

  const strongPasswords = Math.max(
    0,
    totalPasswords - weakPasswords
  );

  const securityScore =
    totalPasswords === 0
      ? 100
      : Math.round(
          (strongPasswords / totalPasswords) * 100
        );

  return (
    <div
      className="
        min-h-full
        space-y-8
        text-gray-900
        transition-colors
        duration-300
        dark:text-white
      "
    >
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back to VaultGold."
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Passwords"
          value={totalPasswords}
        />

        <StatCard
          title="Weak Passwords"
          value={weakPasswords}
          color="#ef4444"
        />

        <StatCard
          title="Strong Passwords"
          value={strongPasswords}
          color="#22c55e"
        />
      </div>

      {/* Security Score + Recent Passwords */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Security Score */}
        <GlassCard>
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Security Score
          </h2>

          <SecurityScore score={securityScore} />
        </GlassCard>

        {/* Recent Passwords */}
        <GlassCard>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Passwords
            </h2>

            {recentPasswords.length > 0 && (
              <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37]">
                {recentPasswords.length}
              </span>
            )}
          </div>

          {recentPasswords.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
              <div className="mb-3 flex justify-center text-4xl text-[#D4AF37]">
                <FaLock aria-hidden="true" />
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white">
                No passwords saved yet
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your recently saved passwords will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPasswords.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#D4AF37]/30
                    hover:shadow-sm

                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:hover:border-[#D4AF37]/50
                  "
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                      {item.website}
                    </h3>

                    <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                      {item.username}
                    </p>

                    {item.category && (
                      <span className="mt-2 inline-block rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-xs font-medium text-[#D4AF37]">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-lg text-[#D4AF37]">
                    <FaLock aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Backup & Restore */}
      <GlassCard>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Backup & Restore
            </h2>

            <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
              Export your vault to a backup file or restore
              it from a previous backup.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-4">

            {/* Export */}
            <button
              type="button"
              onClick={exportVault}
              className="
                rounded-full
                bg-[#D4AF37]
                px-6
                py-3
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:bg-[#C19B2E]
                hover:shadow-md
                active:scale-95
              "
            >
              Export Vault
            </button>

            {/* Import */}
            <label
              className="
                cursor-pointer
                rounded-full
                border
                border-gray-300
                bg-white
                px-6
                py-3
                font-semibold
                text-gray-700
                transition-all
                duration-300
                hover:bg-gray-100
                active:scale-95

                dark:border-gray-600
                dark:bg-gray-800
                dark:text-gray-200
                dark:hover:bg-gray-700
              "
            >
              Import Vault

              <input
                hidden
                type="file"
                accept=".json"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  try {
                    await importVault(file);

                    alert(
                      "Vault imported successfully!"
                    );

                    await loadDashboard();
                  } catch (error) {
                    console.error(error);

                    alert(
                      "Failed to import vault."
                    );
                  }

                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}