import Link from 'next/link';
import { MarketingNav, MarketingFooter } from '@/components/MarketingLayout';

export default function NotFound() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="not-found shell">
        <p className="eyebrow">404 · Message not delivered</p>
        <h1>
          This page took
          <br />
          <em>a different route.</em>
        </h1>
        <p>Let’s get you back to Hermes.</p>
        <Link className="button button-primary" href="/">
          Back to home →
        </Link>
      </main>
      <MarketingFooter />
    </>
  );
}
