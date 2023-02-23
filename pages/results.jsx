import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parse } from 'next-useragent';

import { Grid, Box, Typography } from '@material-ui/core';

import Posts from '@/components/post/Posts';

export default function Results() {
  const { query } = useRouter();
  const keywords = query.keywords?.replaceAll('_', ' '); 

  return (
    <div style={{ margin: "0px 9px 0px 9px" }}>
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
        <Box ml={2} >
          <Typography><i>displaying results for: <b>"{keywords}"</b></i></Typography>
        </Box>
        }
      </Grid>
      
      <Posts query={query} />
    </div>
  );
};

export function getServerSideProps(context) {
  return {
    props: {
      uaString: context.req.headers['user-agent'],
    }
  };
}


