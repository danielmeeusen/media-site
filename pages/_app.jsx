import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from '../theme/themes';
import { AppWrapper } from '../lib/AppContext';
import Layout from '../components/Layout';

export default function MyApp(props) {
  // The Component prop is the active page
  // pageProps are the initial props that were preloaded for your page
  const { Component, pageProps } = props;


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppWrapper>
      <Head>
        <title>Media Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="icon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="icon/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <ThemeProvider theme={darkTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
        <Component {...pageProps} />
        </Layout> 
      </ThemeProvider>
      </AppWrapper>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};