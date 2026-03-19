import { Skeleton } from '@/components/ui/skeleton';

export function CollectionSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-44 rounded-2xl" />
      <div className="flex items-end gap-5 px-6 -mt-20">
        <Skeleton className="w-28 h-28 rounded-2xl flex-shrink-0" />
        <div className="space-y-3 pb-2">
          <Skeleton className="w-56 h-8 rounded" />
          <Skeleton className="w-36 h-5 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
