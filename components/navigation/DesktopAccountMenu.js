import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Badge, IconButton } from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(.5),
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
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleAppearenceMenuOpen}>Appearance: Dark</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
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
      <MenuItem onClick={handleAppearenceMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleAppearenceMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleAppearenceMenuClose}>My account</MenuItem>
    </Menu>
  )

  return (
    <React.Fragment>
      <IconButton aria-label="show 17 new notifications" color="inherit" className={classes.icon}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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