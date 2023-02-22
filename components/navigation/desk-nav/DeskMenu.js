import React, { useState, useContext } from 'react';
import Link from '@/components/shared/Link';

import { Drawer, Toolbar, List, Divider, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SortIcon from '@material-ui/icons/Sort';
import DeskFilterList from './DeskFilterList';
import TwitterIcon from '@material-ui/icons/Twitter';
import Copyright from '@/components/shared/Copyright';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { useCurrentUser } from '@/lib/user/hooks';
import { deskMenuContext, sortContext } from '@/lib/AppContext';

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
  sort: {
    fontSize: '16px', 
    margin: '0px 0px 0px 15px',
    },
  sortMenu: {
    margin: '0px 0px 0px 200px',
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
  const [ sort, setSort ] = useContext(sortContext);
  const [ anchorEl, setAnchorEl ] = useState(null);
  
  const handleSort =(v) => {
    setAnchorEl(null);
    setSort(v);
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

      <ListItem button onClick={ (e) => setAnchorEl(e.currentTarget) } >
        <SortIcon />
        <ListItemText 
          align="center"
          primary={
          sort == 'blend' ?
          <span className={classes.sort}> Blend </span>
          :
          sort == "new" ? 
            <span className={classes.sort}> Latest First </span>
            : 
            <span className={classes.sort}> Oldest First </span>
          } 
          />
        <ListItemIcon>
          { sort == 'blend' ? <TrendingUpIcon /> : sort == "new" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> }
        </ListItemIcon>
      </ListItem>

      <Menu
        className={classes.sortMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={ ()=> setAnchorEl(null) }
      >
        <MenuItem onClick={() => handleSort('new')} > 
          <ListItemText className={classes.menuItem}> Newest First <ArrowDownwardIcon /> </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('blend')} >
          <ListItemText className={classes.menuItem}>Blend <TrendingUpIcon /> </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('old')} >
          <ListItemText className={classes.menuItem}> Oldest First <ArrowDownwardIcon /> </ListItemText>
        </MenuItem>
      </Menu>

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

      <Link href="https://twitter.com/danmeeusen" target="_new">
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
