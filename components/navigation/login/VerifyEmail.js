import Head from 'next/head';

import { Container, Box, Button } from '@material-ui/core/';

import Msg from '@/components/shared/Msg';


export default function SendVerification({ user, sendVerification, msg }) {

  return (
    <>
    <Head>
      <title>Verify Email</title>
    </Head>
    <Container component="main" maxWidth="md" align="center" >
      
      {user?.emailVerified && (
        <Box sx={{ mt: 20, fontSize: 18, }} >
        <Box fontWeight='fontWeightBold' display='inline'>{user?.email}</Box> has been verified.
        </Box>
      )}

      {!user?.emailVerified && (
        <>
        <Box sx={{ mt: 4, fontSize: 18, }} >
          A verification email has been sent from <Box fontWeight='fontWeightBold' display='inline'>{user?.email}</Box> to:
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
          onClick={sendVerification}>
            Resend Verification Email
        </Button>
        </>
        )}
    </Container>
    </>
  )
}