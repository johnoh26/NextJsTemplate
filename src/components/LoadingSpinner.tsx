export default function LoadingSpinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-gray-200 rounded-full`}
        ></div>
        <div
          className={`${sizeClasses[size]} border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}
        ></div>
      </div>
    </div>
  );
}
