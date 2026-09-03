interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg

        dark:border-gray-700
        dark:bg-gray-800
        dark:shadow-black/20
      "
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">
        <h2
          className="text-4xl font-bold"
          style={{
            color: color || "#D4AF37",
          }}
        >
          {value}
        </h2>

        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: color || "#D4AF37",
          }}
        />
      </div>
    </div>
  );
}