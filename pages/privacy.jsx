import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function record() {
  return (
    <Container maxWidth="sm">
      <Box my={4} align="center">
        <Typography variant="h4" component="h1">
          Privacy
        </Typography>
        </Box>
    </Container>
  );
}