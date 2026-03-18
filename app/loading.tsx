import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 px-6 py-10">
      <Skeleton className="h-16 w-72" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </main>
  );
}
