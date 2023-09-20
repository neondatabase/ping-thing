import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <Html lang='en'>
      <Head>
        {isProd ? (
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              (function (w, d, s, l, i) {
                w[l] = w[l] || []
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : ''
                j.async = true
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
                f.parentNode.insertBefore(j, f)
              })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM}')
            `}
          </Script>
        ) : null}
      </Head>
      <body>
        <Main />
        <NextScript />
        {isProd ? (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`}
            strategy='afterInteractive'
          />
        ) : null}
      </body>
    </Html>
  );
};

export default Document;
