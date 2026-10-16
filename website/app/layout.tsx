import type { Metadata } from 'next';
import '@/styles/globals.css';

const title = 'Hermes — Good logs. Less ceremony.';
const description =
  'Logging for Java 17+ that stays out of your way. Compile-time logger generation, async delivery, structured output, and integrations for Spring Boot and Kotlin.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3003"),
  title,
  description,
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title,
    description,
    siteName: 'Hermes',
    type: 'website',
    locale: 'en_US',
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hermes — Good logs. Less ceremony.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
