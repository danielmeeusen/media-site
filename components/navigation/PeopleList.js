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

export default function PeopleList({ filtername }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { data } = useSWR(`/api/people`, fetcher);
  
  data?.people.sort( (fi, si) => si.media.length - fi.media.length);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItem button >
      <ListItemText primary='People' className={classes.parent} />
    </ListItem>

      <List component="div" disablePadding dense>

        {data?.people.slice(0, 3).map(item => {
          const text = `${item.name}  (${item.media.length})`
          return (
          <ListItem button key={item._id} className={classes.nested}>
            <ListItemText primary={text} />
          </ListItem>
          )} 
        )}

        <Collapse in={open} timeout="auto" unmountOnExit>

        {data?.people.slice(3).map(item => {
          const text = `${item.name}  (${item.media.length})`
          return (
          <ListItem button key={item._id} className={classes.nested}>
            <ListItemText primary={text} />
          </ListItem>
          )} 
        )}

        </Collapse>

      </List>

      <ListItem button onClick={handleClick} className={classes.nested}>
            <ListItemText primary={open ? "show less" : "show more"} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

      <Divider />
            
    </>
  );
}
