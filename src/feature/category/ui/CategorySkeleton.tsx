import { Skeleton } from "@/shared/ui/skeleton";

const CategoryTabSkeleton = ({ length = 11 }: { length?: number }) => {
  return (
    <div
      className="w-full px-3 md:justify-center justify-start flex gap-4 overflow-x-scroll whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      {[...Array(length)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-16 rounded-2xl" />
      ))}
    </div>
  );
};

export default CategoryTabSkeleton;
