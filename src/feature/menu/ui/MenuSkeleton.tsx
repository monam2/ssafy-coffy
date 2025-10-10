import { Card, CardContent, CardHeader } from "@/shared/ui";
import { Skeleton } from "@/shared/ui";

export default function MenuSkeleton() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className="w-[300px] m-auto px-4 dark:bg-gray-400 dark:border-none"
        >
          <CardHeader className="items-center m-auto p-2 pt-6">
            <div className="w-[180px] h-[250px]">
              <Skeleton className="w-full h-full rounded-2xl" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-around items-center">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex justify-between mt-3">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
