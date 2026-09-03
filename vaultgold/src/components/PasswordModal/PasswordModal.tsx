import type { PasswordItem } from "../../database/db";

interface PasswordModalProps {
  password: PasswordItem;
  onClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PasswordModal({
  password,
  onClose,
  onEdit,
  onDelete,
}: PasswordModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-3xl font-bold">
          {password.website}
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p>{password.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Password</p>
            <p className="font-mono">{password.password}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Website</p>
            <p>{password.url || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p>{password.notes || "No notes"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p>
              {new Date(password.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          <button
            onClick={() => navigator.clipboard.writeText(password.username)}
            className="rounded-full bg-blue-600 px-5 py-2 text-white"
          >
            Copy Username
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(password.password)}
            className="rounded-full bg-[#D4AF37] px-5 py-2 text-white"
          >
            Copy Password
          </button>

          <button
            onClick={() => onEdit(password.id!)}
            className="rounded-full border border-blue-500 px-5 py-2 text-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(password.id!)}
            className="rounded-full border border-red-500 px-5 py-2 text-red-600"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="ml-auto rounded-full border px-5 py-2"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}