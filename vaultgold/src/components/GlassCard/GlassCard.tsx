import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-md
        transition-all
        duration-300

        dark:border-gray-700
        dark:bg-gray-800
        dark:shadow-black/20

        ${className}
      `}
    >
      {children}
    </div>
  );
}