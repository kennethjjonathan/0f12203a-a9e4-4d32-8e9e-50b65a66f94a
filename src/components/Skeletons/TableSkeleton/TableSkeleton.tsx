import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-3 h-[640px]">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
  );
};

export default TableSkeleton;
