import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box } from '@material-ui/core';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import Link from '@/components/shared/Link';
import { useSite } from '@/lib/site/hooks';

export default function record() {
  const [ site ]  = useSite();

  return (
    <>
    <Head>
    <title>Privacy Policy</title>
    </Head>
    <Container maxWidth="md" >
      
      <Box align="center" style={{ margin: "10% 0% 4% 0%"}} >
      <VisibilityOffOutlinedIcon fontSize="large" style={{marginBottom: 10 }} />

        <Typography variant="h5">
          {site?.siteName} Privacy Policy
        </Typography>
      </Box>

      <Typography variant="body1" align="center" >
        This privacy policy discloses the privacy practices for this website and this website only.
      </Typography>

      <Box align="center" style={{ margin: "5% 0% 1% 0%" }} >
        <Typography variant="h5"align="center" >
          Information Collection, Use, and Sharing
        </Typography>
      </Box>

      <Typography variant="body1" align="center" >
      {site?.siteName} only collects and stores usernames, email addresses, passwords, and anonymous session data from its members. All data is deleted from {site?.siteName} servers when an account is deleted. 
      </Typography>

      <Box align="center" style={{  margin: "5% 0% 1% 0%" }} >
        <Typography variant="h5"  align="center" >
          Cookies
        </Typography>
      </Box>

      <Typography variant="body1" align="center" >
      {site?.siteName} does use Cookies to manage user sessions and device security. You may disable cookies in your browser but {site?.siteName} bares no responsibility for decreased user experience.
      </Typography>

      <Box align="center" style={{  margin: "5% 0% 1% 0%" }} >
        <Typography variant="h5"  align="center" >
          Links
        </Typography>
      </Box>

      <Typography variant="body1" align="center">
      {site?.siteName} does link to third-party sites. These third-party sites have independent privacy policies which {site?.siteName} bares no liability for.  We do seek to protect the integrity of our site and welcome any feedback about any sites we link to.
      </Typography>

      <Typography variant="h5"  align="center" style={{  margin: "5% 0% 1% 0%" }}>
      Updates
      </Typography>

      <Typography variant="body1" align="center" >
      {site?.siteName}'s Privacy Policy may change from time to time and all updates will be posted on this page.
      </Typography>

      <Typography variant="body1"  align="center" style={{  margin: "5% 0% 1% 0%" }}>
      If you ever feel that we are not abiding by this stated Privacy Policy please feel free to <Link href="/contact" display='inline'>contact us</Link>.
      </Typography>

      </Container>
      </>
  );
};