import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from '../styles/themes';
import { ContextWrapper } from '../lib/AppContext';
import MainLayout from '../components/layout/MainLayout';
import { useSite } from '@/lib/site';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

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
      <DefaultSeo {...SEO } />
      <ThemeProvider theme={darkTheme}>
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