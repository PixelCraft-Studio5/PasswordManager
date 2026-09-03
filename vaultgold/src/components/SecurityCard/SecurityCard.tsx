import GlassCard from "../GlassCard/GlassCard";
import { FaCheck, FaTriangleExclamation } from "react-icons/fa6";

interface SecurityCardProps {
  website: string;
  risk: "Low" | "Medium" | "High";
  breached: boolean;
  accounts: string;
  date: string;
}

export default function SecurityCard({
  website,
  risk,
  breached,
  accounts,
  date,
}: SecurityCardProps) {
  const riskColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{website}</h2>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${riskColor[risk]}`}
        >
          {risk} Risk
        </span>
      </div>

      <p>
        <strong>Latest Breach:</strong> {date}
      </p>

      <p>
        <strong>Accounts Exposed:</strong> {accounts}
      </p>

      <div
        className={`rounded-xl p-4 ${
          breached
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        <div className="flex items-center gap-2">
          {breached ? (
            <FaTriangleExclamation aria-hidden="true" />
          ) : (
            <FaCheck aria-hidden="true" />
          )}
          <span>
            {breached
              ? "You have a saved account for this website."
              : "No locally saved account found."}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}