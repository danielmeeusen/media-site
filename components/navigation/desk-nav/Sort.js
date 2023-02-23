import React, { useState, useContext } from 'react';
import Link from '@/components/shared/Link';

import { Drawer, Toolbar, List, Divider, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TuneIcon from '@material-ui/icons/Tune';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { deskMenuContext, sortContext } from '@/lib/AppContext';

import DeskFilterList from './DeskFilterList';
import Copyright from '@/components/shared/Copyright';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    borderRight: 'none',
  },
  link: {
    fontSize: '16px',
     color: theme.palette.text.primary,
  },
  sort: {
    fontSize: '16px', 
    marginRight: '5px',
    },
  sortMenu: {
    margin: '0px 0px 0px 200px',
  },
  menuItem: {
    textAlign: 'right',
    margin: '0px 0px 0px 0px'
  }
}));

export default function DeskMenu() {
  const classes = useStyles();
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
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <List dense>

        <ListItem button onClick={ (e) => setAnchorEl(e.currentTarget) } >
          <TuneIcon />
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

          <DeskFilterList filtername={'people'} />
          <DeskFilterList filtername={'tags'} />
          <DeskFilterList filtername={'year'} />

          <Divider/>   

          <Link href="/contact" >
            <ListItem button >
              <ListItemText align="center">
                <span className={classes.link} > Contact </span> 
              </ ListItemText>
            </ListItem>
          </Link>

          <Divider/>   

          <Link href="/abuse" >
            <ListItem button >
              <ListItemText align="center">
                <span className={classes.link} > Report Abuse </span> 
              </ ListItemText>
            </ListItem>
          </Link>

        <Divider/>     

        <Link href="/privacy" >
        <ListItem button >
            <ListItemText align="center">
              <span className={classes.link} > Privacy Policy </span> 
            </ ListItemText>
          </ListItem>
        </Link>

        <Divider />

        <Link href="/record" >
        <ListItem button >
            <ListItemText align="center">
              <span className={classes.link} > 2257 Record </span> 
            </ ListItemText>
          </ListItem>
        </Link>

        <Divider />

      </List>

      <Copyright />

      </Drawer>
  );
}
