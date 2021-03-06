import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../components/ProTip';
import Link from '../components/Link';

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box my={4} align="center">
        <Typography variant="h4" component="h1">
          About
        </Typography>
        </Box>
        <Box my={8} align="center">
        <Button variant="contained" color="primary" component={Link} naked href="/">
          Go to the main page
        </Button>
        <ProTip />
      </Box>
    </Container>
  );
}