type Props = {
  title?: string;
  message?: string;
};

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>

        <div className="p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-1/6 rounded bg-gray-200" />
              <div className="h-4 w-1/6 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No users found",
  message = "Try adjusting your filters or check back later.",
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-gray-100" />
      <h2 className="text-base font-medium text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "Retry later.",
}: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
      <h2 className="text-base font-medium text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
}
