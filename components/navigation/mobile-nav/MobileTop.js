import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { mobileHomeContext } from '../../../lib/AppContext';
import { useSite } from '@/lib/site';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 55,
    },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [ mobileHome, setMobileHome ] = useContext(mobileHomeContext);
  const site = useSite();

  return (
    <Box display={ mobileHome.display } >
      <AppBar elevation={0} position="sticky" className={classes.appBar}>
        <Toolbar>
          <span style={{ cursor: 'pointer', flexGrow: '1' }}>
          <Link href="/">
          <Typography  variant="h6" >
          {site?.sitename}
          </Typography>
          </Link>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}