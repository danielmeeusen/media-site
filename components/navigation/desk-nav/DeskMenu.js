import React, { useContext } from 'react';
import Link from '@/components/shared/Link';

import { Drawer, Toolbar, List, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { useCurrentUser } from '@/lib/user/hooks';
import { deskMenuContext, mobileBottomContext } from '@/lib/AppContext';
import Sort from '@/components/navigation/shared/Sort';
import MenuFilterList from '@/components/navigation/shared/MenuFilterList';
import Copyright from '@/components/shared/Copyright';
import HistoryIcon from '@material-ui/icons/History';


const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    borderRight: 'none',
    overflow: 'hidden',
    scrollbarGutter: 'stable',
    '&:hover' : {
      overflow: 'scroll'
    }
  },
  menuItem: {
    borderRadius: "30px",
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '16px',
  },
  icon: {
    color: theme.palette.custom.sixtyFive,
    marginBottom: '-5px',
    marginLeft: '10px'
  }
}));

export default function DeskMenu() {
  const classes = useStyles();
  const [ user, { mutate } ] = useCurrentUser();
  const [ deskMenu, setdeskMenu ] = useContext(deskMenuContext);  
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setMobileBottom('Home');
    }
    setMobileBottom('Home');
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={deskMenu}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />

      <List dense>

      <Sort toggleDrawer={toggleDrawer} />

      {user?.watchlist &&
        <Link href={'/results?type=watchlist'} >
          <ListItem button className={classes.menuItem} >
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText>
              <span className={classes.link} > WatchList </span> 
            </ListItemText>
          </ListItem>
        </Link>
      }

      {user?.history &&
        <Link href={'/results?type=history'} >
          <ListItem button className={classes.menuItem} >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>
              <span className={classes.link} > History </span> 
            </ListItemText>
          </ListItem>
        </Link>
      }

      <Divider/>  

      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'people'} />
      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'tags'} />
      <MenuFilterList toggleDrawer={toggleDrawer} filtername={'year'} />

      <Link href="/about" >
        <ListItem button className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <DescriptionOutlinedIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > About </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Link href="https://twitter.com/DanMeeusen" target="_new">
        <ListItem button className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <TwitterIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > Twitter </span> 
          </ListItemText>
        </ListItem>
      </Link>

      <Link href="https://github.com/danielmeeusen" target="_new">
        <ListItem button className={classes.menuItem} >
          <ListItemIcon>
            <span className={classes.icon} > <GitHubIcon /> </span>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.link} > GitHub </span> 
          </ListItemText>
        </ListItem>
      </Link>

    <Link href="/contact">
      <ListItem button className={classes.menuItem} >
        <ListItemIcon>
          <span className={classes.icon} > <MailOutlinedIcon /> </span>
        </ListItemIcon>
        <ListItemText>
          <span className={classes.link} > Contact </span> 
        </ListItemText>
      </ListItem>
    </Link>

    <Link href="/privacy" >
      <ListItem button className={classes.menuItem} >
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

  </Drawer>
  );
}
