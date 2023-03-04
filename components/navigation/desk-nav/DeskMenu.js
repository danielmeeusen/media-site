import React, { useContext } from 'react';
import Link from '@/components/shared/Link';

import { Drawer, Toolbar, List, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
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

      <Link href="https://twitter.com/FetishKitsch" target="_new">
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

      <Link href="/abuse" >
        <ListItem button >
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

    <Link href="/record" >
      <ListItem button >
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

  </Drawer>
  );
}
