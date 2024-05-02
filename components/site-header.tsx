import Link from 'next/link';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { buttonVariants } from '#/components/ui/button';

import { siteConfig } from '#/config/site';

import { Logo } from './icons/logo';

export const SiteHeader = () => (
  <header className='sticky top-0 z-40 w-full border-b bg-background'>
    <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
      <Link
        href='/'
        className='flex items-center space-x-2'
      >
        <Logo className='h-6 w-6' />
        <span className='inline-block font-bold'>{siteConfig.name}</span>
      </Link>
      <nav className='flex flex-1 items-center justify-end space-x-4'>
        <Link
          href={siteConfig.links.github}
          target='_blank'
          rel='noreferrer'
          className={buttonVariants({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          <GitHubLogoIcon className='h-5 w-5' />
          <span className='sr-only'>GitHub</span>
        </Link>
      </nav>
    </div>
  </header>
);
