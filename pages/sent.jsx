import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box } from '@material-ui/core';


export default function Sent() {

  return (
    <>
    <Head>
    <title>Your Message Has Been Sent</title>
    </Head>

    <Container maxWidth="md" >      
      <Box mt={20} align="center">
        <Typography variant="h5">
          Your message has been sent.
        </Typography>
      </Box>
    </Container>
      </>
  );
}
