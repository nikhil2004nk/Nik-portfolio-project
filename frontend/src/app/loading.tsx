export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-ink">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-hairline border-t-signal rounded-full animate-spin"></div>
        <p className="font-mono text-muted text-sm uppercase tracking-wider">Loading...</p>
      </div>
    </div>
  );
}
