import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-ink text-center px-4">
      <div className="max-w-md">
        <h1 className="text-9xl font-display font-bold text-signal/20 mb-4">404</h1>
        <h2 className="text-3xl font-display font-bold text-primary mb-4">Page Not Found</h2>
        <p className="text-muted font-mono mb-8">// The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
