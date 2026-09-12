import Link from 'next/link';

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center text-text-soft">
      <p>{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="text-wine-text hover:underline">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
