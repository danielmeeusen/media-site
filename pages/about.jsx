import React from 'react';
import Head from 'next/head';

import { Typography, Container, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: '40px 0px 20px 0px',
    fontSize: '30px',
    fontWeight: 500,
    color: theme.palette.custom.seventyFive,
  },
  text: {
    textAlign: 'center',
    margin: '30px 0px',
    fontSize: '18px',
    fontWeight: 400,
    color: theme.palette.custom.seventyFive,
  },
  features: {
    textAlign: 'center',
    margin: '30px 0px',
    fontSize: '18px',
    fontWeight: 500,
    color: theme.palette.custom.seventyFive,
  },
  list: {
    margin: "0px -15px",
    listStyleType: 'circle',
    fontSize: '18px',
    fontWeight: 400,
    color: theme.palette.custom.seventyFive
  },
  listItem: {
    marginTop: '15px'
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
      <Box className={classes.title}>
        About
      </Box>

      <div mb={4} className={classes.text} >
          This site is meant to test the functionality and scalability of using Next.js as a social/media site.  
      </div>

      <div className={classes.features}>
          Features:
      </div>

      <ul className={classes.list}>
        <li>
          <Link href="https://nextjs.org/" target="_blank">Next.js</Link> v11 with intention of upgrading to v12 with <Link href="https://typescriptlang.org/" target="_blank">Typescript</Link>
        </li>
        <li>
          <Link href="https://mui.com/" target="_blank">Material UI</Link> v4 with intention of upgrading to v5 along with <Link href="https://typescriptlang.org/" target="_blank">Typescript</Link>.
        </li>
        <li>
          <Link href="https://www.mongodb.com/cloud/atlas" target="_blank">Mongodb Atlas</Link> for database and search indexing.
        </li>
        <li>
          <Link href="https://github.com/hoangvvo/next-connect" target="_blank">Next-Connect</Link> for middleware.
        </li>
        <li>
          <Link href="https://github.com/hoangvvo/next-session" target="_blank">Next-Session</Link> for independent authentication and session management.
        </li>
        <li>
          <Link href="https://nodemailer.com/" target="_blank">Node-Mailer</Link> for email verification and recovery.
        </li>
        <li>
          <Link href="https://www.bunny.net/" target="_blank">Bunny.net</Link> for media encoding and hosting.
        </li>
        <li>
          <Link href="https://swr.vercel.app/" target="_blank">useSWR</Link> for data management.
        </li>
        <li>
          PWA capable via <Link href="https://github.com/shadowwalker/next-pwa" target="_blank">Next-PWA</Link>.
        </li>
      </ul>

        <div className={classes.text} >
          Feel free to use the links in the left bar for more information.  
        </div>

      </Container>
    </>
  );
};