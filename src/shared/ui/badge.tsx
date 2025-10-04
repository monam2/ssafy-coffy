import { cn } from "../lib/cn";

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <span
      className={cn(
        "text-[10px] px-2 py-1 rounded bg-gray-500 text-white",
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
