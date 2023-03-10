import React from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { Typography, Container, Box, Button } from '@material-ui/core';

import { fetcher } from '@/lib/fetch';
import { getMongoDb } from '@/api-lib/mongodb';
import { useCurrentUser } from '@/lib/user/hooks';
import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import Link from '@/components/shared/Link';


export default function EmailVerifyPage({ success }) {
  const [ user ] = useCurrentUser();
  const { data } = useSWR('/api/user/epoch/subscribe', fetcher);

  return (
    <>
      <Head>
        <title>Email Verified</title>
      </Head>
      <Container maxWidth="md" >
      
        <Box mt={20} align="center">
         
          {success
            ? 
              <>
                <Box sx={{fontSize: "22px"}}>
                  Thank you for verifying your email address!
                </Box>
                {!user.subscribed &&
                <Box my={5}>
                <Link href={ data?.link || '/404' } target="_blank" >
                  <Button variant="contained" color="primary" style={{ borderRadius: '30px' }}>
                    FINISH PURCHASING SUBSCRIPTION
                  </Button>
                </Link>
                </Box>
                }
              </>
            :
            <>
              <Box my={5}>
                <Typography variant="h6">
                  Sorry this link has expired.
                </Typography>  
              </Box>  
              
              { user &&
                <Link href={`/send-verification/${user?.username}`} >
                  <Button variant="contained" color="primary" style={{ borderRadius: '30px' }}>
                    SEND NEW VERIFICATION EMAIL
                  </Button>
                </Link>
              }
            </>
            }
          </Box>

        <Box>
          <Typography variant="body1" align="center" paragraph>
          
          </Typography>
        </Box>
      </Container>
             
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const { token } = context.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    db,
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { success: false } };

  await updateUserById(db, deletedToken.creator_id, {
    emailVerified: true,
  });

  return { props: { success: true } };
}
