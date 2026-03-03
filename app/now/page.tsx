import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What John Eric is focused on right now.'
};

export default function NowPage() {
  return (
    <div className="container-shell py-12">
      <div className="max-w-2xl space-y-4">
        <h1 className="font-display text-4xl font-semibold">Now</h1>
        <p className="text-muted-foreground">Current focus: ecommerce conversion systems, motion UI ad packages, SaaS demo storytelling, and scalable content production workflows.</p>
      </div>
    </div>
  );
}
