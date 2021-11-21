import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {Container, Box, withWidth, Hidden, Button } from '@material-ui/core';

import TopDesk from './navigation/desk-nav/TopDesk';
import MobileTop from './navigation/mobile-nav/MobileTop';
import MobileBottom from './navigation/mobile-nav/MobileBottom';

import { AppContext } from '../lib/AppContext';


function Layout(props) {
  const { children, pageProps } = props; 
  const [ menuOpen, setMenuOpen ] = useContext(AppContext);

  return (
    <React.Fragment>


    {/* Mobile UI */}
      <Hidden mdUp>
        <MobileTop />
        <Container maxWidth="sm">
          <Box textAlign='center' mb={10} > 
          { children }
          </Box>
      </Container>
      <MobileBottom />
      </Hidden>

      {/* desktop Ui */}
      <Hidden smDown>
      <TopDesk />
      <Container maxWidth="lg">
        <Box my={10} textAlign='center'>
          { children }
        </Box>
      </Container>
      </Hidden>      
      </React.Fragment>
    ) 
}

Layout.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Layout);