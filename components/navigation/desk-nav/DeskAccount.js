import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, ListItem, Drawer } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { deskAccountContext, settingsContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Account from '@/components/navigation/shared/Account';

import Copyright from '@/components/shared/Copyright';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    marginTop: '55px',
    paddingBottom: '70px'
  }
}));

export default function DeskAccount() {
  const classes = useStyles();
  const [ user, { mutate }] = useCurrentUser();
  const [ deskAccount, setDeskAccount ] = useContext(deskAccountContext);
  const [ settings, setSettings ] = useContext(settingsContext);
  
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };
  
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setDeskAccount(!deskAccount);
    } else if (open == 'logout') {
      handleLogout();
    }
    setDeskAccount(!deskAccount);
    if(open === 'subscriptions') {
      setSettings('subscriptions');
    }
  };
  if(user){
    return (
      <Drawer
        anchor="right"
        open={deskAccount}
        onClose={toggleDrawer(false)}
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

      </Drawer>
    );
  } else {
    return <></>
  }
}