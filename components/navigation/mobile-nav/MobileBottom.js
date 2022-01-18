import React, {useState, useContext } from 'react';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useCurrentUser } from '@/lib/user/hooks';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { mobileHomeContext, mobileSearchContext, mobileMenuContext, mobileAccountContext } from '../../../lib/AppContext';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
    fontSize: 18,
    zIndex: '1400'
  },
  action: {
    fontSize: 18,
  }
}))

export default function MobileBottom() {
  const classes = useStyles();
  const [user, { mutate }] = useCurrentUser();
  const [value, setValue] = useState('Home');
  const [ mobileMenu, setMobileMenu ] = useContext(mobileMenuContext);
  const [ mobileHome, setMobileHome ] = useContext(mobileHomeContext);
  const [ mobileSearch, setMobileSearch ] = useContext(mobileSearchContext);
  const [ mobileAccount, setMobileAccount ] = useContext(mobileAccountContext);
  
  const handleChange = (event, newValue) => {

    newValue == 'Menu' ? setMobileMenu({"display": "block"}) : setMobileMenu({"display": "none"});

    newValue == 'Home' ? value == "Home" ? Router.push('/') : setMobileHome({"display": "block"}) : setMobileHome({"display": "none"});

    newValue == 'Search' ? setMobileSearch({"display": "block"}) : setMobileSearch({"display": "none"});

    newValue == 'Account' ? setMobileAccount({"display": "block"}) : setMobileAccount({"display": "none"});
        
    setValue(newValue);
  };
  

  return (
    <BottomNavigation position="relative" value={value || "Home"} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Menu" value="Menu" icon={<MenuIcon />} className={classes.action}/>
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} className={classes.action}/>
      <BottomNavigationAction label="Search" value="Search" icon={<SearchIcon />} className={classes.action} />
      <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} className={classes.action}/>
    </BottomNavigation>
  );
}