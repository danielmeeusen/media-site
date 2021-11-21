import React, {useState, useContext } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { AppContext } from '../../../lib/AppContext';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
    fontSize: 18,
  },
  action: {
    fontSize: 18,
  }
}))

export default function MobileBottom() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [ menuOpen, setMenuOpen ] = useContext(AppContext);

  const handleChange = (event, newValue) => {    
    value === newValue ? setValue() : setValue(newValue);
    newValue === 'Menu' && setMenuOpen(!menuOpen);

    console.log(menuOpen);
  };

  return (
    <>
    <BottomNavigation elevation={0} position="fixed" value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Menu" value="Menu" icon={<MenuIcon />} className={classes.action}/>
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} className={classes.action}/>
      <BottomNavigationAction label="Search" value="Search" icon={<SearchIcon />} className={classes.action} />
      <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} className={classes.action}/>
    </BottomNavigation>
    </>
  );
}