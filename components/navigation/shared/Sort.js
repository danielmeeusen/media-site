import React, { useState, useContext } from 'react';

import { ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

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
    borderRadius: "30px",

  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '16px',
  }
}));

export default function Sort({ toggleDrawer }) {
  const classes = useStyles();
  const [ sort, setSort ] = useContext(sortContext);
  const [ anchorEl, setAnchorEl ] = useState(null);
  
  const handleSort =(v) => {
    setAnchorEl(null);
    setSort(v);
  };

  return (
    <>
      <ListItem button onClick={(e) => setAnchorEl(e.currentTarget)} className={classes.menuItem} >
        <SortRoundedIcon />
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
          { sort == 'blend' ? <TrendingUpRoundedIcon /> : sort == "new" ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon /> }
        </ListItemIcon>
      </ListItem>

      <Menu
        className={classes.sortMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={ ()=> setAnchorEl(null) }
        onClick={ toggleDrawer(false) }
        >
        <MenuItem onClick={() => handleSort('new')}  className={classes.menuItem} > 
          <ListItemText> Newest First <ArrowDownwardRoundedIcon style={{marginBottom: '-5px'}} /> </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('blend')} className={classes.menuItem} >
          <ListItemText> Blend <TrendingUpRoundedIcon style={{marginBottom: '-5px'}} /> </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSort('old')} className={classes.menuItem} >
          <ListItemText> Oldest First <ArrowUpwardRoundedIcon style={{marginBottom: '-5px'}} /> </ListItemText>
        </MenuItem>
      </Menu>      
    </>
  );
}
