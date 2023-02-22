import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { Container, Box, Button } from '@material-ui/core/';

import { serverSideFindUserByUsername } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { loadingContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user';
import Msg from '@/components/shared/Msg';
import { CONFIG as MAIL_CONFIG } from '@/api-lib/mail';


export default function SendVerification({ user, email }) {
  const [ currentUser ] = useCurrentUser();
  const [ loading, setLoading ] = useContext(loadingContext);
  const isCurrentUser = currentUser?._id === user?._id;
  const [msg, setMsg] = useState({ message: '', isError: false });

  useEffect(() => {
    if (!currentUser)  {
      Router.push('/');
    }
  }, [currentUser]);

  async function sendVerificationEmail() {
    setLoading(true);
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status === 200) {
      setMsg({ message: 'An email has been sent to your mailbox' });
      setLoading(false);
    } else {
      setLoading(false);
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
    <Head>
      <title>Verify Email</title>
    </Head>
    <Container component="main" maxWidth="md" align="center" >
      { isCurrentUser && user?.emailVerified && (
        <Box sx={{ mt: 20, fontSize: 18, }} >
        <Box fontWeight='fontWeightBold' display='inline'>{user?.email}</Box> has been verified.
        </Box>
      )}

      { isCurrentUser && !user?.emailVerified && (
        <>
        <Box sx={{ mt: 15, fontSize: 18, }} >
          A verification email has been sent from <Box fontWeight='fontWeightBold' display='inline'>{email}</Box> to:
        </Box>

        <Box sx={{ my: 3, fontSize: 18, fontWeight: 'bold', }} >
          {user?.email}
        </Box>
        <Box sx={{ mb: 3, fontSize: 18, }} >
          Please check your spam folder before resending verification.
        </Box>

        <Box my={1}>
          <Msg msg={msg} />
        </Box>

        <Button 
          variant="contained"
          color="primary"
          onClick={sendVerificationEmail}>
            Resend Verification Email
        </Button>
        </>
        )}

    </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();
  
  const user = await serverSideFindUserByUsername(
    db,
    context.params.username
  );
  user._id = String(user._id);

  if (!user) {
    return {
      notFound: true,
    };
  }
  return { props: { user, email: MAIL_CONFIG.from } };
}