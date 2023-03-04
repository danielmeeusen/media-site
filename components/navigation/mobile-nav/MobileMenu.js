import React, { useState, useContext } from 'react';
import Link from '@/components/shared/Link';

import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, ListItem, ListItemText, Divider, ListItemIcon, SwipeableDrawer } from '@material-ui/core';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CloseIcon from '@material-ui/icons/Close';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { mobileBottomContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Sort from '@/components/navigation/shared/Sort';
import MobileFilterList from './MobileFilterList';
import Copyright from '@/components/shared/Copyright';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    paddingBottom: '70px',
  },
  menuItem: {
    fontSize: '17px', 
    textAlign: 'right',
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '17px',
  },
  icon: {
    color: theme.palette.custom.sixtyFive,
    marginBottom: '-3px',
    marginLeft: '10px'
  },
}));

export default function MobileMenu() {
  const classes = useStyles();
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ user, { mutate } ] = useCurrentUser();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setMobileBottom('Home');
    }
    setMobileBottom('Home');
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={mobileBottom == 'Menu'}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <IconButton 
        onClick={ toggleDrawer(false) } 
        style={{ margin: '-10px 0px -15px 170px' }} 
        >
        <CloseIcon fontSize="large" />
      </IconButton>

      <List dense>
      
      <Divider/>    
      
      <Sort />

      <Divider/>    

      {user?.watchlist &&
        <Link href={'/results?type=watchlist'} >
          <ListItem button onClick={toggleDrawer(false)} >
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText>
              <span className={classes.link} > WatchList </span> 
            </ListItemText>
          </ListItem>
        </Link>
      }

      <Divider/>    

      <MobileFilterList toggleDrawer={toggleDrawer} filtername={'people'} />
      <MobileFilterList toggleDrawer={toggleDrawer} filtername={'tags'} />
      <MobileFilterList toggleDrawer={toggleDrawer} filtername={'year'} />

      <Link href="https://twitter.com/FetishKitsch" target="_new">
        <ListItem button onClick={toggleDrawer(false)} >
          <ListItemIcon>
            <span className={classes.icon} > <TwitterIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Twitter </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider/>   

      <Link href="/contact">
        <ListItem button onClick={toggleDrawer(false)} >
          <ListItemIcon>
            <span className={classes.icon} > <MailOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Contact </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider/>   

      <Link href="/abuse" >
        <ListItem button onClick={toggleDrawer(false)} >
          <ListItemIcon>
            <span className={classes.icon} > <ReportProblemOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Report Abuse </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider/>     

      <Link href="/privacy" >
        <ListItem button onClick={toggleDrawer(false)} >
          <ListItemIcon>
            <span className={classes.icon} > <VisibilityOffOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Privacy Policy </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider />

      <Link href="/record" >
        <ListItem button onClick={toggleDrawer(false)} >
          <ListItemIcon>
            <span className={classes.icon} > <DescriptionOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > 2257 Record </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider />

      </List>

      <Copyright />

    </SwipeableDrawer>
  );
}