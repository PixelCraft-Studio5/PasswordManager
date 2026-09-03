import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiLock,
  FiPlusCircle,
  FiSettings,
  FiLock as FiLockVault,
} from "react-icons/fi";
import { getVaultOwnerName } from "../../utils/masterPassword";

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const ownerName = getVaultOwnerName();

  function lockVault() {
    sessionStorage.removeItem("vaultUnlocked");
    navigate("/lock");
  }

  const navItem =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] dark:text-gray-300 dark:hover:text-[#D4AF37]";

  const activeItem =
    "bg-[#D4AF37] text-white shadow";

  return (
    <div className="flex h-auto flex-col md:h-full">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
          VaultGold
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Secure Password Manager
        </p>
      </div>

      {/* User */}
      <div className="mt-5 rounded-2xl bg-gray-100 p-3 dark:bg-gray-800 md:mt-10 md:p-4">
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-bold text-white">
              {ownerName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {ownerName}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vault Owner
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-5 flex flex-col gap-2 md:mt-10">

        {/* Dashboard */}
        <NavLink
          to="/"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <FiHome size={20} />
          Dashboard
        </NavLink>

        {/* Vault */}
        <NavLink
          to="/vault"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <FiLock size={20} />
          Vault
        </NavLink>

        {/* Save Password */}
        <NavLink
          to="/save-password"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <FiPlusCircle size={20} />
          Save Password
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <FiSettings size={20} />
          Settings
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="mt-5 md:mt-auto">

        <button
          onClick={lockVault}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          <FiLockVault size={20} />
          Lock Vault
        </button>

      </div>

    </div>
  );
}