import React, { useContext } from 'react';
import { Drawer } from '@material-ui/core';

import { AppContext } from '../../../lib/AppContext';
import { makeStyles } from '@material-ui/core/styles';

import ContentMenu from '../ContentMenu';

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

export default function MenuDrawer() {
  const classes = useStyles();
  const [ menuOpen, setMenuOpen ] = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={menuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <ContentMenu />
      </Drawer>
    </div>
  );
}
