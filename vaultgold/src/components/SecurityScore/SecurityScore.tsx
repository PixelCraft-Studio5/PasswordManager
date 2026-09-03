interface SecurityScoreProps {
  score: number;
}

export default function SecurityScore({
  score,
}: SecurityScoreProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(100, Math.max(0, score));

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  const getScoreLabel = () => {
    if (safeScore >= 80) return "Excellent";
    if (safeScore >= 60) return "Good";
    if (safeScore >= 40) return "Needs Attention";
    return "Weak";
  };

  const scoreLabel = getScoreLabel();

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Score Ring */}
      <div className="relative h-52 w-52">

        <svg
          className="-rotate-90"
          width="208"
          height="208"
          viewBox="0 0 208 208"
        >
          {/* Background Ring */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Progress Ring */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="#D4AF37"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="drop-shadow-sm"
            style={{
              transition:
                "stroke-dashoffset 1s ease",
            }}
          />
        </svg>

        {/* Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {safeScore}%
          </span>

          <span className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Security
          </span>

        </div>
      </div>

      {/* Score Status */}
      <div className="mt-4 text-center">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {scoreLabel}
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {safeScore >= 80
            ? "Your vault is well protected."
            : safeScore >= 60
            ? "Your vault is reasonably secure."
            : safeScore >= 40
            ? "Consider improving your weak passwords."
            : "Your vault needs immediate attention."}
        </p>

      </div>

    </div>
  );
}