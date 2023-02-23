import Image from 'next/image';
import Head from 'next/head';

import { Box, Container } from '@material-ui/core/';


export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Container component="main" maxWidth="md" align="center">
        <Box style={{ marginTop: "15%" }}>
          <Image 
            src="/image/tommyboy-whatyoudo.gif" 
            alt="What'd you do?!?" 
            width="498" height="280" 
            />
          <h1>404 - Page Not Found</h1>
        </Box>
    </Container>
  </>
  )
}