import React, { useEffect } from 'react';
import Script from 'next/script'
import Head from 'next/head';
import PropTypes from 'prop-types';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { darkTheme, lightTheme } from '@/styles/themes';
import { ContextWrapper } from '@/lib/AppContext';
import ClientLayout from '@/components/layout/ClientLayout';
import Meta from '@/components/shared/Meta';

export default function MyApp(props) {
  // The Component prop is the active page
  // pageProps are the initial props that were preloaded for your page
  const { Component, pageProps } = props;
  const { openGraphData = [] } = pageProps;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>   
      <Head>
        <title>MediaSite</title>
        <link rel="preconnect" href="https://kitsch-images.b-cdn.net" />
        <Meta />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        
      {openGraphData.map((og) => (
        <meta {...og} />
        ))}
      </Head>   

      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GYCFQXYZMM" strategy="afterInteractive" />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-GYCFQXYZMM');
        `}
      </Script>

      <ContextWrapper>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
            <ClientLayout>
              <Component {...pageProps} />
            </ClientLayout> 
        </ThemeProvider>
      </ContextWrapper>    
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};