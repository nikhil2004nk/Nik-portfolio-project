'use client';

import { useEffect } from 'react';
import { Button } from '../components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-ink text-center px-4">
      <div className="max-w-md">
        <h2 className="text-3xl font-display font-bold text-alert mb-4">Something went wrong!</h2>
        <p className="text-muted font-mono mb-8">// ERROR: {error.message || 'Unknown error occurred'}</p>
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
