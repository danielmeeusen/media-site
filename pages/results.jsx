import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Typography } from '@material-ui/core';

import Posts from '@/components/post/Posts';

export default function Results() {
  const { query } = useRouter();
  const keywords = query.keywords?.replaceAll('_', ' '); 

  return (
    <>
      <Head>
        <title>{keywords}</title>
      </Head>

        {query.keywords &&
        <Box ml={2} mt={1} >
          <Typography><i>displaying results for: <b>"{keywords}"</b></i></Typography>
        </Box>
        }
      
      <Posts query={query} />
    </>
  );
};


