import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={2} >
      <Typography variant="h4" component="h1" align="center" >
          Media Site
        </Typography>
        </Box>
        <Box my={8}>
        <Typography align="center">
        <Link href="/about" color="secondary" >
          Go to the about page
        </Link>
        </Typography>
      </Box>
    </Container>
  );
}