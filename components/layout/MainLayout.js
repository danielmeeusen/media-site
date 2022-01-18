import React from 'react';
import PropTypes from 'prop-types';

import { withWidth, Hidden } from '@material-ui/core';

import MobileLayout from './MobileLayout';
import DeskLayout from './DeskLayout';



function MainLayout(props) {
  const { children } = props; 

  return (
    <>
      <Hidden mdUp>
        <MobileLayout>
            { children }
        </MobileLayout>
      </Hidden>

      <Hidden smDown>
        <DeskLayout>
          { children }
        </DeskLayout>
      </Hidden> 
      </>
    ) 
}

MainLayout.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(MainLayout);