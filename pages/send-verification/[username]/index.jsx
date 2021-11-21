import Head from 'next/head';
import Router from 'next/router';
import nc from 'next-connect';
import { useState, useContext } from 'react';


import { Container, Box, Button } from '@material-ui/core/';

import { database } from '@/api-lib/middlewares';
import { serverSideFindUserByUsername } from '@/api-lib/db';
import { useCurrentUser } from '@/lib/user';
import { AppContext } from '../../../lib/AppContext';


export default function SendVerification({ user, email }) {
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  const [msg, setMsg] = useState({ message: '', isError: false });

  async function sendVerificationEmail() {
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status === 200) {
      setMsg({ message: 'An email has been sent to your mailbox' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
    <Head>
      <title>Verify Email</title>
    </Head>
    <Container component="main" maxWidth="xs">
    { isCurrentUser && user?.emailVerified && (
      <Box
      sx={{
        mt: 15,
        fontSize: 18,
      }}
      >
      <Box fontWeight='fontWeightBold' display='inline'>{user?.email}</Box> has already been verified.
      </Box>
    )}
        {isCurrentUser && !user?.emailVerified && (
        <>
        <Box
        sx={{
          mt: 15,
          fontSize: 18,
        }}
        >
          A verification email has been sent from <Box fontWeight='fontWeightBold' display='inline'>{email}</Box> to:
        </Box>
        <Box 
          sx={{
            my: 3,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {user?.email}
        </Box>
        <Box
        sx={{
          mb: 3,
          fontSize: 18,
        }}
        >
          Please check your spam folder before resending verification.
        </Box>

        <Box my={2}>
        {msg?.message !== '' ?
        <span style={{ color: "MediumVioletRed"}} >{msg.message}</span>
        :
        <span style={{color: "black", cursor: "default"}} >verify email</span>}
        </Box>

        <Button 
        variant="contained"
        color="primary"
        onClick={sendVerificationEmail}>
          Resend Verification Email
          </Button>
        </>
        )}

        {!isCurrentUser && (
        <Box 
        sx={{
          mt: 15,
          fontSize: 18,
        }} 
        >
          Please Login or Signup to verify email.</Box>
        )}
    </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);
  const user = await serverSideFindUserByUsername(
    context.req.db,
    context.params.username
  );

  if (!user) {
    return {
      notFound: true,
    };
  }
  return { props: { user, email: process.env.EMAIL } };
}