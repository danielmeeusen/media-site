import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

import Link from 'next/link';

import { useCurrentUser } from '@/lib/user/hooks';



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
  const [user, { mutate }] = useCurrentUser();

  return (
    <div className={classes.root}>
      <AppBar  elevation={0} position="static" className={classes.appBar}>
        <Toolbar>
          <span style={{ cursor: 'pointer', flexGrow: '1' }}>
          <Link href="/">
          <Typography  variant="h6" >
            Site Name
          </Typography>
          </Link>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}