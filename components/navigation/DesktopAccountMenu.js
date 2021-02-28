import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Badge, IconButton } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
},
  menuItem: {
    marginRight: theme.spacing(8),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DesktopAccountMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [appearenceAnchorEl, setAppearenceAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isAppearenceMenuOpen = Boolean(appearenceAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAppearenceMenuOpen = (event) => {
    setAppearenceAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAppearenceMenuClose = () => {
    handleMenuClose();
    setAppearenceAnchorEl(null);
  }

  const menuId = 'primary-search-account-menu';
  const appearenceMenuId = 'appearence-menu';

  const renderMenu = (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuOpen}><VpnKeyIcon className={classes.menuIcon} />Login</MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuOpen}><Brightness4Icon className={classes.menuIcon} /> Appearance: Dark</MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuOpen}><AccountBoxIcon className={classes.menuIcon} /> Sign Up</MenuItem>
        </Menu>

  )

  const renderAppearenceMenu = (
    <Menu
      id={appearenceMenuId}
      anchorEl={appearenceAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      open={isAppearenceMenuOpen}
      onClose={handleAppearenceMenuClose}
    >
      <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuClose}>Dark Theme</MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuClose}>Midium Theme</MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleAppearenceMenuClose}>Light Light</MenuItem>
    </Menu>
  )

  return (
    <React.Fragment>
      <IconButton className={classes.icon}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
            {renderAppearenceMenu}
    </React.Fragment>
  )
}