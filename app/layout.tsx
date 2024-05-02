import '#/styles/globals.css';

import type { Metadata, Viewport } from 'next';

import { Toaster } from 'sonner';

import { SiteHeader } from '#/components/site-header';
import { TailwindIndicator } from '#/components/tailwind-indicator';

import { fontSans } from '#/lib/fonts';
import { cn } from '#/lib/utils';
import { siteConfig } from '#/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang='en'>
    <head />
    <body
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <div className='relative flex min-h-screen flex-col'>
        <SiteHeader />
        <div className='flex-1'>{children}</div>
      </div>
      <Toaster />
      <TailwindIndicator />
    </body>
  </html>
);

export default RootLayout;
