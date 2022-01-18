import React from 'react';
import PropTypes from 'prop-types';
import {withWidth, Hidden } from '@material-ui/core';
import DeskHome from '../components/content/desk-content/DeskHome';
import MobileHome from '../components/content/mobile-content/MobileHome';
import Warning from '../components/Warning'


function Index(props) {

  return (     
    <>
      <Warning />
      <Hidden mdUp>
        <MobileHome />
      </Hidden>

      <Hidden smDown>
        <DeskHome />
      </Hidden>
    </>
  );
}

Index.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Index);