interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
        {title}
      </h1>

      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}