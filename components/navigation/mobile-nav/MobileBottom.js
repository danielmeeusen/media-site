import React, {useState, useContext } from 'react';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

import { useCurrentUser } from '@/lib/user/hooks';

import { mobileBottomContext, loginDialogContext, editDialogContext } from '@/lib/AppContext';

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    position: 'fixed',
    bottom: '0',
    zIndex: theme.zIndex.modal + 1,
    maxHeight: '48px'
  },
  icon: {
    fontSize: '28px',
  }
}));

export default function MobileBottom() {
  const classes = useStyles();
  const [ user ] = useCurrentUser();
  const [ value, setValue ] = useState('Home');
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  const [ editDialog, setEditDialog ] = useContext(editDialogContext);
  
  const handleChange = (event, newValue) => {
    setEditDialog(false);
    if(mobileBottom == 'Account' && newValue !== 'Account') {
      setLoginDialog({ ...loginDialog, open: false })
    }
    if(newValue == 'Account' && !user) { 
      if(loginDialog.open) {
        setLoginDialog({ ...loginDialog, open: false });
        setMobileBottom('Home');
      } else {
        setLoginDialog({ open: true, tab: 0 });
        setMobileBottom('Account');
      }
    } else if(newValue == 'Home' && mobileBottom == 'Home') {
      if(Router.pathname == '/') {
        window.scrollTo({top: 0, behavior: 'smooth'})
      } else {
        Router.push('/');
      }
    } else if(!user && mobileBottom == "Account" && newValue == 'Home') {
      setLoginDialog({ ...loginDialog, open: false })
      setMobileBottom('Home');
    } else if(mobileBottom == newValue) {
      setMobileBottom('Home');
      setValue(mobileBottom);
    } else {
      setMobileBottom(newValue);
      setValue(newValue);
    }    
  }

  return (
    <BottomNavigation 
      showLabels
      value={mobileBottom} 
      onChange={handleChange} 
      className={classes.bottomNav} 
    >

      <BottomNavigationAction 
        value="Menu" 
        label=""
        aria-label="Menu"
        icon={<MenuIcon className={classes.icon} />} 
        className={classes.action}/>

      <BottomNavigationAction 
        value="Home" 
        label=""
        aria-label="Home"
        icon={<HomeIcon className={classes.icon} />}/>

      {user?.creator &&
      <BottomNavigationAction 
        value="Add" 
        label=""
        aria-label="Add"
        icon={<AddIcon className={classes.icon}/>} 
        className={classes.action}/>
      }

      <BottomNavigationAction 
        value="Search" 
        label=""
        aria-label="Search"
        icon={<SearchIcon className={classes.icon} />} 
        className={classes.action} />

      <BottomNavigationAction 
        value="Account" 
        label=""
        aria-label="Account"
        icon={<AccountCircleIcon className={classes.icon} />} 
        className={classes.action}/>
      
    </BottomNavigation>
  );
}