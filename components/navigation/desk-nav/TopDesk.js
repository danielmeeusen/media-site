import React, { useContext } from 'react';
import Link from 'next/link';

import {AppBar, Toolbar, IconButton, Typography, InputBase, Grid, Divider } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';

import MenuDrawer from './DeskDrawer';
import { AppContext } from '../../../lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';

import AccountButton from '../AccountButton';
import LoginButtons from '../LoginButtons';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 55,
    },
  toolBar: {
    minHeight: 55,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  search: {
    display: 'flex',
    height: 35,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.03),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.07),
    },
    width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      color: alpha(theme.palette.common.white, 0.5),
    },
    divider: {
      height: 28,
      margin: 4,
  },
}));


export default function TopAppBar(props) {
  const classes = useStyles();  
  const [ menuOpen, setMenuOpen ] = useContext(AppContext);
  const [user, { mutate }] = useCurrentUser();
  
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="fixed" className={classes.appBar} >
        <Toolbar className={classes.toolBar}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
           <Grid container spacing={3} alignItems="center">
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <span style={{ cursor: 'pointer' }}>
          <Link href="/">
          <Typography  variant="h6" >
            Media Site
          </Typography>
          </Link>
          </span>
          </Grid>
          
          </Grid>          
          <Grid item xs={4}>
          <div className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="search">
              <SearchIcon />
           </IconButton>
          </div>
          </Grid>          
            <Grid item xs={4}>  
              <Grid container justifyContent="flex-end" alignItems="center"> 
                {user ? <AccountButton /> : <LoginButtons />}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>   
      <MenuDrawer />  
    </div>
  );
}