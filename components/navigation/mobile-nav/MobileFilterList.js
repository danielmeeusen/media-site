import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetch'

import { List, ListItem, ListItemText, Collapse, Divider } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({ 
  parent: {
    paddingLeft: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(5),
  }
}));


export default function MobileFilterList({ filtername }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { data } = useSWR(`/api/filter/${filtername}`, fetcher);

  if(filtername == 'year'){
    data?.filter.sort( (fi, si) => si.name - fi.name);
  } else { 
  data?.filter.sort( (fi, si) => si.media.length - fi.media.length);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>

      <ListItem button onClick={handleClick} >
        <ListItemText align={"center"}>
        <span style={{ fontSize: '24px' }}  >
          { filtername.charAt(0).toUpperCase() + filtername.slice(1) } 
        </span>
        <span style={{verticalAlign: 'sub', paddingLeft: '2%' }} > 
        {open ? <ExpandLess /> : <ExpandMore />}
        </span>
        </ListItemText>        
      </ListItem>
      
        <List disablePadding dense>
          <Collapse in={open} timeout="auto" unmountOnExit>

          {data?.filter.map(item => {
            const text = `${item.name}  (${item.media.length})`
            return (
            <ListItem button key={item._id} className={classes.nested}>
              <ListItemText>
                <span style={{ marginLeft: "35%", fontSize: '18px' }}>
                {text}
                </span>
              </ListItemText>
            </ListItem>
            )} 
          )}

          </Collapse>
        </List>
        <Divider />
            

    {/* <ListItem button onClick={ handleClick } >
      <ListItemText >
        <span style={{ fontSize: '18px', paddingLeft: '30px' }} >
          { filtername.charAt(0).toUpperCase() + filtername.slice(1) }
        </span>
        </ ListItemText>
    </ListItem>

    <List component="div" disablePadding dense>

    {data?.filter.slice(0, 3).map(item => {
      const text = `${item.name}  (${item.media.length})`
      return (
      <ListItem button key={item._id} >
        <ListItemText >
          <span style={{ fontSize: '16px', paddingLeft: '40px' }} > { text } </span>
        </ListItemText>
      </ListItem>
      )} 
    )}

    <Collapse in={open} timeout="auto" unmountOnExit>

    {data?.filter.slice(3).map(item => {
      const text = `${item.name}  (${item.media.length})`
      return (
      <ListItem button key={item._id} >
        <ListItemText primary={text} style={{ fontSize: '18px', paddingLeft: '40px' }} />
      </ListItem>
      )} 
    )}
        </Collapse>

      </List>

      <ListItem button onClick={handleClick} >
        <ListItemText 
        primary={open ? "show less" : "show more"} 
        align={"center"} 
        />
          {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Divider /> */}
            
    </>
  );
}
