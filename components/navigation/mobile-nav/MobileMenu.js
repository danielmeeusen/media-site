import React, { useState, useContext } from 'react';
import Link from '@/components/shared/Link';

import { makeStyles } from '@material-ui/core/styles';
import { List, IconButton, ListItem, ListItemText, Divider, ListItemIcon, Menu, MenuItem, SwipeableDrawer } from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CloseIcon from '@material-ui/icons/Close';
import SortIcon from '@material-ui/icons/Sort';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Copyright from '@/components/shared/Copyright';

import { mobileBottomContext, sortContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import MobileFilterList from './MobileFilterList';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    paddingBottom: '70px',
  },
  sortMenu: {
    margin: '0px 0px 0px 200px',
  },
  sort: {
    fontSize: '17px', 
    marginRight: '5px',
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
  const [ sort, setSort ] = useContext(sortContext);
  const [ anchorEl, setAnchorEl ] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setMobileBottom('Home');
    }
    setMobileBottom('Home');
  };

  const handleSort =(v) => {
    setAnchorEl(null);
    setSort(v);
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
      
      <ListItem button onClick={ (e) => setAnchorEl(e.currentTarget) } >
          <SortIcon />
          <ListItemText 
            align="right"
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
            {sort == 'blend' ? <TrendingUpIcon /> : sort == "new" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
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

        <Link href="https://github.com/danielmeeusen/media-site" target="_new">
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

    </SwipeableDrawer>
  );
}