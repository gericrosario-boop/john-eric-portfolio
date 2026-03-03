import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container-shell space-y-6 py-12">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-6 w-1/2" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-60 w-full" />
        ))}
      </div>
    </div>
  );
}
