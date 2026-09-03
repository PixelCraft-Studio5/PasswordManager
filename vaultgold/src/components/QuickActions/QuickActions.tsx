import { useNavigate } from "react-router-dom";
import {
  FiPlusCircle,
  FiLock,
  FiDownload,
  FiSettings,
} from "react-icons/fi";
import { exportVault } from "../../database/backupService";

export default function QuickActions() {
  const navigate = useNavigate();

  async function backupVault() {
    await exportVault();
  }

  const actions = [
    {
      title: "Save Password",
      icon: <FiPlusCircle size={24} />,
      path: "/save-password",
      color: "bg-[#D4AF37]",
    },
    {
      title: "Open Vault",
      icon: <FiLock size={24} />,
      path: "/vault",
      color: "bg-blue-500",
    },
    {
      title: "Backup",
      icon: <FiDownload size={24} />,
      action: backupVault,
      color: "bg-green-500",
    },
    {
      title: "Settings",
      icon: <FiSettings size={24} />,
      path: "/settings",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={() => action.action ? action.action() : navigate(action.path)}
          className={`${action.color} flex flex-col items-center justify-center rounded-3xl p-6 text-white shadow transition hover:scale-105`}
        >
          {action.icon}

          <span className="mt-4 font-semibold">
            {action.title}
          </span>
        </button>
      ))}
    </div>
  );
}