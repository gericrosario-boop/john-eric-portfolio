import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container-shell py-20 text-center">
      <h1 className="mb-3 font-display text-4xl font-semibold">Page not found</h1>
      <p className="mb-6 text-muted-foreground">The page you requested doesn’t exist.</p>
      <Button asChild><Link href="/">Back home</Link></Button>
    </div>
  );
}
