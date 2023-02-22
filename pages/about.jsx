import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box } from '@material-ui/core';

import { useSite } from '@/lib/site/hooks';

export default function record() {
  const [ site ]  = useSite();
  return (
    <>
    <Head>
    <title>About</title>
    </Head>

    <Container maxWidth="md" >
      
      <Box align="center" style={{ margin: "10% 0% 5% 0%"}} >
        <Typography variant="h4">
          About
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" align="center" paragraph>
          This site is meant as a test demonstration of a serverless video centered social media subsciption site. 
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          
        </Typography>
      </Box>
      </Container>
      </>
  );
};