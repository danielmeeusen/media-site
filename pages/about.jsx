import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '16px',
  },
  list: {
    listStyleType: 'circle',
    margin: "0px 0px 0px -20px",
    '& li': {
      marginBottom: '20px'
    },
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

    <Container maxWidth="sm" >
      <Box className={classes.paper}>

        <DescriptionOutlinedIcon fontSize="large" style={{marginBottom: 10,  marginTop: "4%" }} />
       
        <Typography variant="h5">
          About
        </Typography>

        <Box my={2} align="center" >
            This site is meant to test the functionality and scalability of using Next.js for a social/media site.  
        </Box>

        <Box my={1}>
        <Typography variant="h6">
            Features:
          </Typography>
        </Box>

        <ul className={classes.list}>
          <li className={classes.item}>
            Hybrid Server Side and Client Side Rendering for optimum SEO and user privacy.
          </li>
          <li>
            Client IP and User Agent finger printing for better device tracking to increase account security. 
          </li>
          <li>
            Self managed authentication and session managment.
          </li>
        </ul>

        <Box my={1}>
        <Typography variant="h6">
            Built With:
          </Typography>
        </Box>

        <ul className={classes.list}>
          <li className={classes.item}>
            <Link href="https://nextjs.org/" target="_blank">Next.js</Link> for performant serverless hybrid server side / client side rendering. 
          </li>
          <li>
            <Link href="https://mui.com/" target="_blank">Material UI</Link> Component Library for rapid prototyping.
          </li>
          <li>
            <Link href="https://github.com/hoangvvo/next-connect" target="_blank">Next-Connect</Link> for fast light JAM stack complient middleware.
          </li>
          <li>
            <Link href="https://swr.vercel.app/" target="_blank">useSWR</Link> for hybrid state/data managment.
          </li>
          <li>
            <Link href="https://github.com/hoangvvo/next-session" target="_blank">Next-Session</Link> for secure session management.
          </li>
          <li>
            <Link href="https://www.passportjs.org/" target="_blank">Passport.js</Link> for independant secure authentication.
          </li>
          <li>
            <Link href="https://www.mongodb.com/cloud/atlas" target="_blank">Mongodb Atlas</Link> for database and search indexing.
          </li>
          <li>
            <Link href="https://nodemailer.com/" target="_blank">Node-Mailer</Link> for email verification and recovery.
          </li>
          <li>
            <Link href="https://www.bunny.net/" target="_blank">Bunny.net</Link> for media encoding and hosting.
          </li>
          <li>
            PWA capable via <Link href="https://github.com/shadowwalker/next-pwa" target="_blank">Next-PWA</Link>.
          </li>
        </ul>

        <Box my={2} align="center" >
          Feel free to use the links in the left bar for more information.  
        </Box>

        </Box>
      </Container>
    </>
  );
};