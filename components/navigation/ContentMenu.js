import React, { useState } from 'react';
import { useCurrentUser } from '@/lib/user/hooks';

import PeopleList from './PeopleList';

import { Drawer, Toolbar, List, Divider, ListItem, ListItemText, Typography, Collapse } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { FormatIndentIncreaseSharp } from '@material-ui/icons';

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


export default function ContentMenu() {
  const classes = useStyles();
  const [user, { mutate }] = useCurrentUser();
  const filternames = ['People', 'Genre', 'Tags'];

  user?.favorites > 0 && filternames.push('Favorites');

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Toolbar />
      <List dense>

        <PeopleList filtername={ filternames } />

        <ListItem button >
          <ListItemText primary='Genre'/>
        </ListItem>
        <ListItem button >
          <ListItemText primary='Tags'/>
        </ListItem>
      </List>
      <Divider/>          
      <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
        {`© ${new Date().getFullYear()} Media Site`}
      </Typography>
    </>
  );
}
