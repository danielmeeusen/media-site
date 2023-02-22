import React, { useContext } from 'react';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, ListItem, SwipeableDrawer } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { mobileBottomContext, settingsContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Account from '@/components/navigation/shared/Account';

import Copyright from '@/components/shared/Copyright';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    paddingBottom: '70px'
  },
  username: {
    fontSize: '26px', 
    color: theme.palette.custom.seventyFive,
  },
  creator: {
    fontSize: '16px',
    color: theme.palette.custom.seventyFive,
  },
  subscription: {
    color: theme.palette.custom.seventyFive,
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '16px',
  },
  icon: {
    color: theme.palette.custom.eightyFive,
    marginBottom: '-5px',
    marginLeft: '10px',
    padding: '10px'
  },
  logout: {
    fontSize: '16px', 
    color: theme.palette.custom.sixtyFive,
  },
  logoutIcon: {
    color: theme.palette.custom.sixtyFive,
    marginBottom: '-5px',
    marginLeft: '10px',
    padding: '10px'
    }
}));

export default function MobileAccount() {
  const classes = useStyles();
  const [ user, { mutate }] = useCurrentUser();
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ settings, setSettings ] = useContext(settingsContext);

  
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
    Router.reload();
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setMobileBottom('Home');
    } else if (open == 'logout') {
      handleLogout();
    }
    setMobileBottom('Home');
    if(open === 'subscriptions') {
      setSettings('subscriptions');
    }
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={ Boolean(user && mobileBottom == 'Account') }
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      classes={{ paper: classes.drawerPaper }}
    >
      <List dense>
        <ListItem style={{ paddingLeft: "0px", marginTop: "-15px" }} >
          <IconButton onClick={ toggleDrawer(false) } >
            <CloseIcon fontSize="large" />
          </IconButton>
        </ListItem>

        <Account toggleDrawer={toggleDrawer} />

        </List>

      <Copyright />

    </SwipeableDrawer>
  );
}