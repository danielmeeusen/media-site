import React, { useEffect } from 'react';
import Script from 'next/script'
import Head from 'next/head';
import PropTypes from 'prop-types';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { darkTheme, lightTheme } from '@/styles/themes';
import { ContextWrapper } from '@/lib/AppContext';
import ClientLayout from '@/components/layout/ClientLayout';
import MetaTags from '@/components/shared/MetaTags';

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
        <MetaTags />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        
      {openGraphData.map((og) => (
        <meta {...og} />
        ))}
      </Head>   

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