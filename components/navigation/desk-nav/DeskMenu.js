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
import { deskMenuContext } from '@/lib/AppContext';
import Sort from '@/components/navigation/shared/Sort';
import DeskFilterList from './DeskFilterList';
import Copyright from '@/components/shared/Copyright';

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
    textAlign: 'right',
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

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={deskMenu}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />

      <List dense>

      <Sort />

      <Divider/>   
      
      {user?.watchlist &&
        <Link href={'/results?type=watchlist'} >
          <ListItem button >
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

      <DeskFilterList filtername={'people'} />
      <DeskFilterList filtername={'tags'} />
      <DeskFilterList filtername={'year'} />

      <Link href="/about" >
        <ListItem button >
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
        <ListItem button >
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
        <ListItem button >
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
      <ListItem button >
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
      <ListItem button >
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
