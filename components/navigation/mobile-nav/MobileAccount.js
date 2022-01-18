import React, {useState, useContext } from 'react';
import NextLink from 'next/link'
import { useCurrentUser } from '@/lib/user/hooks';
import { useSite } from '@/lib/site';


import { mobileAccountContext } from '../../../lib/AppContext';
import FilterList from '../desk-nav/DeskFilterList';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Box, Divider, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
  }
}));

export default function MobileAccount() {
  const classes = useStyles();
  const site = useSite();
  const [open, setOpen] = useState(true);
  const [ mobileAccount ] = useContext(mobileAccountContext);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box display={ mobileAccount.display } >
      <List>

        <FilterList filtername={'people'} />

        <FilterList filtername={'tags'} />

        <FilterList filtername={'year'} />

        <Divider/>     

        <NextLink href="/contact" passHref>
          <ListItem button >
            <ListItemText primary='Contact'align="center" />
          </ListItem>
        </NextLink>

        <Divider/>     

        <NextLink href="/privacy" passHref>
          <ListItem button >
            <ListItemText primary='Privacy Policy'align="center" />
          </ListItem>
        </NextLink>

        <Divider />

        <NextLink href="/record" passHref>
          <ListItem button >
            <ListItemText primary='2257 Record'align="center" />
          </ListItem>
        </NextLink>

        <Divider />

      </List>


      <Typography variant="body2" color="textSecondary" align="center">
        {`© ${new Date().getFullYear()} ${site?.sitename}`}
      </Typography>
    </Box>
  );
}