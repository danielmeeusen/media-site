import React, { useContext } from 'react';
import { Drawer } from '@material-ui/core';

import { leftDeskMenuContext } from '../../../lib/AppContext';
import { makeStyles } from '@material-ui/core/styles';

import ContentMenu from './ContentMenu';

let drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
  },
  parent: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'Bold',
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  copyright: {
    marginTop: theme.spacing(2),
  },
  MuiListItemTextRoot: {
    fontWeight: '900'
  } 
}));

export default function LeftDeskDrawer() {
  const classes = useStyles();
  const [ leftDeskMenu, setLeftDeskMenu ] = useContext(leftDeskMenuContext);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={leftDeskMenu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <ContentMenu />
      </Drawer>
    </div>
  );
}
