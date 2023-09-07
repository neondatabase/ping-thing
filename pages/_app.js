import React, { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { QueryClient, QueryClientProvider } from 'react-query';
import { IBM_Plex_Sans } from 'next/font/google';

import logo from '../static/logo.svg';
import GitHubIcon from '../components/github-icon';

import '../styles/globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const url = 'https://ping-thing.vercel.app/';
  const seoTitle = 'Ping Thing';
  const seoDescription = 'A @neondatabase/serverless demo';
  const seoImage = 'open-graph-image.jpg';

  return (
    <Fragment>
      <Head>
        <title>{seoTitle}</title>
        <link rel='canonical' href={url} />

        {/* Primary Meta Tags */}
        <meta name='title' content={seoTitle} />
        <meta name='description' content={seoDescription} />
        <meta name='image' content={`${url}static/${seoImage}`} />

        {/* Open Graph / Facebook  */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={url} />
        <meta property='og:title' content={seoTitle} />
        <meta property='og:description' content={seoDescription} />
        <meta property='og:image' content={`${url}static/${seoImage}`} />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:url' content={url} />
        <meta name='twitter:title' content={seoTitle} />
        <meta name='twitter:description' content={seoDescription} />
        <meta name='twitter:image' content={`${url}static/${seoImage}`} />

        {/* favicon */}
        <link rel='icon' type='image/png' href={`${url}static/favicon.png`} />
      </Head>

      <QueryClientProvider client={queryClient}>
        <header className='absolute top-0 left-0 w-full h-16 z-20'>
          <nav className='flex justify-between px-4 xl:px-12 py-5 w-full mx-auto max-w-8xl'>
            <a
              href='https://neon.tech/'
              target='_blank'
              rel='noopener'
              className='self-start'
            >
              <Image
                priority
                src={logo}
                alt='Neon logo'
                className='w-[124px] m-0'
              />
            </a>
            <a
              href='https://github.com/neondatabase/ping-thing'
              target='_blank'
              rel='noopener'
              className='flex gap-2 text-white font-bold self-start border-2 border-white items-center p-1 xl:p-1.5 -mt-1 rounded-full no-underline transition-colors duration-300 hover:border-brand-primary'
            >
              <GitHubIcon className='w-7 h-7 xl:h-8 xl:w-8' />
              <span className='hidden xl:block pr-4 pb-1'>ping-thing</span>
            </a>
          </nav>
        </header>
        <main className={`prose max-w-none ${ibmPlexSans.variable}`}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </Fragment>
  );
};

export default App;
