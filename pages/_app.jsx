import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from '../styles/themes';
import { ContextWrapper } from '../lib/AppContext';
import MainLayout from '../components/layout/MainLayout';
import { useSite } from '@/lib/site';

export default function MyApp(props) {
  // The Component prop is the active page
  // pageProps are the initial props that were preloaded for your page
  const { Component, pageProps } = props;
  const site = useSite();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ContextWrapper>
      <Head>
        <title>{site?.sitename}</title>
        <meta name="description" content="Placeholder for eventaul description."></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/icon/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000"></meta>
      </Head>
      <ThemeProvider theme={darkTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout> 
      </ThemeProvider>
    </ContextWrapper>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};