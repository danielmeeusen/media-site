import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Copyright from '../components/Copyright';
import TopAppBar from './navigation/TopAppBar';

export default function Layout({ children }) {
  return (
    <React.Fragment>
    <TopAppBar/>
    <Container maxWidth="sm">
      <Box my={4}>
        <main>{children}</main>
        <Copyright />
      </Box>
    </Container>
    </React.Fragment>
  );
}