import React, { useState } from 'react';
import useSWR from 'swr';

import { List, ListItem, ListItemText, Collapse, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Link from '@/components/shared/Link';
import { fetcher } from '@/lib/fetch';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '16px', 
    paddingLeft: '10px',
  },
  link: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    paddingLeft: '30px',
  },
  skeleton: {
    marginLeft: '40px',
    height: '20px',
    marginBottom: '19px',
  },
  showMore: {
    fontSize: '16px',
  },
  icon: {
    color: theme.palette.custom.sixtyFive,
  }
}));


export default function DeskFilterList({ filtername }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { data } = useSWR(`/api/tag?type=${filtername}`, fetcher);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem >
        <span className={classes.icon} >
          {filtername == 'people' ? <PersonIcon /> : filtername == 'tags' ? <LocalOfferIcon /> : <CalendarTodayIcon />}
        </span>
        <ListItemText >
          <span className={classes.title} >
            {filtername.charAt(0).toUpperCase() + filtername.slice(1)}
          </span>
        </ ListItemText>    
      </ListItem>

      <List disablePadding dense>

        {(data?.slice(0, 3).map(item => {
          const text = item.name.replaceAll('_', ' ');
          return (
            <Link href={`/results?type=filter&keywords=${item.name}`} key={item._id} >
              <ListItem button>
                <ListItemText >
                  <span className={classes.link} > { text } </span>
                </ListItemText>
              </ListItem>
            </Link>
          )} 
        )) 
        || (
          <>
            <Skeleton width={140} className={classes.skeleton} />
            <Skeleton width={140} className={classes.skeleton} />
            <Skeleton width={140} className={classes.skeleton} />
          </>
        )}

        <Collapse in={open} timeout="auto" unmountOnExit>  

          {data?.slice(3).map(item => {
            const text = item.name.replaceAll('_', ' ');
            return (
              <Link href={`/results?type=filter&keywords=${item.name}`} key={item._id} >
                <ListItem button>
                  <ListItemText >
                    <span className={classes.link} > { text } </span>
                  </ListItemText>
                </ListItem>
              </Link>
            )} 
          )}

        </Collapse>

      </List>

      <ListItem button onClick={handleClick} >
      <ListItemText 
          primary={open ? 
          <span className={classes.showMore}>show less</span>
          : 
           <span className={classes.showMore}>show more</span>
          } 
          align={"center"} 
          />
            {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Divider />
      </>
  );
}
