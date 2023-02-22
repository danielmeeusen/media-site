import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '30px',
    fontWeight: 500,
    color: theme.palette.custom.seventyFive,
  },
  text: {
    fontSize: '16px',
    fontWeight: 400,
    color: theme.palette.custom.seventyFive,
  },
  features: {
    fontSize: '18px',
    fontWeight: 500,
    color: theme.palette.custom.seventyFive,
  },
  list: {
    fontSize: '18px',
    fontWeight: 300,
    color: theme.palette.custom.seventyFive,
    "& div": {
      marginTop: '10px',
    }
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

    <Container maxWidth="md" >
      <Box align="center">

        <Box mb={4} className={classes.title}>
          About
        </Box>

        <Box mb={4} className={classes.text} >
            This site is meant to test the functionality and scalability of using Next.js as a social/media site.  
        </Box>

        <Box className={classes.features}>
            Features:
        </Box>

          <Box mb={4} className={classes.list}>
            <Box>- Next.js v11 with intention of upgrading to v12.</Box>
            <Box>- Mongodb Atlas for database and search indexing.</Box>
            <Box>- Material UI v4 with intention of upgrading to v5.</Box>
            <Box>- Next-Connect for middleware</Box>
            <Box>- Next-Session for independant authentication and sesion managment.</Box>
            <Box>- Node-Mailer for email verification and recovery.</Box>
            <Box>- Bunny.net for media encoding and hosting.</Box>
            <Box>- useSWR for data management.</Box>
            <Box>- Bunny.net for media encoding and hosting.</Box>
            <Box>- PWA capable via Next-PWA</Box>
          </Box>

          <Box className={classes.text} >
            Feel free to use the links in the left bar for more information.  
          </Box>

        </Box>
      </Container>
    </>
  );
};