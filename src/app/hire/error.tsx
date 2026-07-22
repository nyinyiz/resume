"use client";

export default function HireError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-lg font-semibold text-foreground">The fit checker hit an unexpected error.</h2>
      <p className="max-w-sm text-sm text-foreground/55">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-lg border border-foreground/[0.1] px-4 py-2 text-sm text-foreground/55 transition-colors hover:text-foreground"
      >
        Try again
      </button>
    </div>
  );
}
