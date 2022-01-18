import React from 'react';

import { Box } from '@material-ui/core';

import MobileTop from '../navigation/mobile-nav/MobileTop';
import MobileBottom from '../navigation/mobile-nav/MobileBottom';
import MobileMenu from '../navigation/mobile-nav/MobileMenu';
import MobileSearch from '../navigation/mobile-nav/MobileSearch'
import MobileAccount from '../navigation/mobile-nav/MobileAccount';

export default function MobileLayout(props) {
  const { children } = props; 

  return (
    <>
      <MobileTop />
      <MobileMenu />
      <MobileSearch />
      <MobileAccount />
      <Box textAlign='center' mb={10} > 
        { children }
      </Box>
      <MobileBottom />
    </>
    ) 
}
