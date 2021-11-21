import React, { useEffect, useState } from 'react';
import {withWidth, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeskContent from '../components/content/DeskContent';
import MobileContent from '../components/content/MobileContent';
import Warning from '../components/Warning'


const useStyles = makeStyles((theme) => ({

}));

function Index(props) {
  const {pageProps} = props;
  const classes = useStyles(); 

 

  return (     
    <React.Fragment>
      <Warning />
      <Hidden mdUp>
        <MobileContent />
      </Hidden>

      <Hidden smDown>
        <DeskContent />
      </Hidden>

    </React.Fragment>
  );
}

export default withWidth()(Index);