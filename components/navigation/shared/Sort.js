import React, { useState, useContext } from 'react';

import { ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SortIcon from '@material-ui/icons/Sort';

import { sortContext } from '@/lib/AppContext';

const useStyles = makeStyles((theme) => ({
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
  }
}));

export default function Sort() {
  const classes = useStyles();
  const [ sort, setSort ] = useContext(sortContext);
  const [ anchorEl, setAnchorEl ] = useState(null);
  
  const handleSort =(v) => {
    setAnchorEl(null);
    setSort(v);
  };

  return (
    <>
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
    </>
  );
}
