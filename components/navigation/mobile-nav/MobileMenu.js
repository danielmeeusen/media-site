import React, { useContext } from 'react';
import Link from '@/components/shared/Link';

import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, ListItem, ListItemText, Divider, ListItemIcon, SwipeableDrawer } from '@material-ui/core';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CloseIcon from '@material-ui/icons/Close';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { mobileBottomContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Sort from '@/components/navigation/shared/Sort';
import MenuFilterList from '@/components/navigation/shared/MenuFilterList';
import Copyright from '@/components/shared/Copyright';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    paddingBottom: '70px',
  },
  menuItem: {
    borderRadius: "30px"
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
  const [ user, { mutate } ] = useCurrentUser();
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);

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
      
      <Sort toggleDrawer={toggleDrawer} />

      {user?.watchlist &&
        <Link href={'/results?type=watchlist'} >
          <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
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

      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'people'} />
      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'tags'} />
      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'year'} />

      <Link href="/about" >
        <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <DescriptionOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > About </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider />

      <Link href="https://twitter.com/DanMeeusen" target="_new">
        <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <TwitterIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Twitter </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Divider/>     

      <Link href="https://github.com/danielmeeusen" target="_new">
        <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <GitHubIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > GitHub </span> 
          </ListItemText>
        </ListItem>
      </Link>

    <Divider/>    

    <Link href="/contact">
      <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
        <ListItemIcon>
          <span className={classes.icon} > <MailOutlinedIcon /> </span>
        </ListItemIcon>
        <ListItemText>
          <span className={classes.link} > Contact </span> 
        </ListItemText>
      </ListItem>
    </Link>

    <Divider/>  

    <Link href="/privacy" >
      <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
        <ListItemIcon>
          <span className={classes.icon} > <VisibilityOffOutlinedIcon /> </span>
        </ListItemIcon>
        <ListItemText>
          <span className={classes.link} > Privacy Policy </span> 
        </ListItemText>
      </ListItem>
    </Link>

    <Divider />

      </List>

      <Copyright />

    </SwipeableDrawer>
  );
}