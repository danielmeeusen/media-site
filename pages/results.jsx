import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, Box, Typography } from '@material-ui/core';

import Posts from '@/components/post/Posts';

export default function Results() {
  const { query } = useRouter();
  const keywords = query.keywords?.replaceAll('_', ' '); 

  return (
    <>
      <Head>
        <title>{keywords}</title>
      </Head>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        >
        {query.keywords &&
        <Box ml={2} mt={1} >
          <Typography><i>displaying results for: <b>"{keywords}"</b></i></Typography>
        </Box>
        }
      </Grid>
      
      <Posts query={query} />
    </>
  );
};


