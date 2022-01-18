import React, {useState, useContext } from 'react';
import NextLink from 'next/link'
import { useCurrentUser } from '@/lib/user/hooks';
import { useSite } from '@/lib/site';
import { SwipeableDrawer } from '@material-ui/core';


import { mobileMenuContext } from '../../../lib/AppContext';
import MobileFilterList from './MobileFilterList';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Box, Divider, Typography, Grid, IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
}));

export default function MobileMenu() {
  const classes = useStyles();
  const site = useSite();
  const [ mobileMenu, setMobileMenu ] = useContext(mobileMenuContext);

  return (
    <Box display={ mobileMenu.display } >
      <List dense>
        <MobileFilterList filtername={'people'} />
        <MobileFilterList filtername={'tags'} />
        <MobileFilterList filtername={'year'} />

        <NextLink href="/contact" passHref>
          <ListItem button >
            <ListItemText align="center">
              <span style={{ fontSize: '24px' }} > Contact </span> 
            </ ListItemText>
          </ListItem>
        </NextLink>

        <Divider/>     

        <NextLink href="/privacy" passHref>
        <ListItem button >
            <ListItemText align="center">
              <span style={{ fontSize: '24px' }} > Privacy Policy </span> 
            </ ListItemText>
          </ListItem>
        </NextLink>

        <Divider />

        <NextLink href="/record" passHref>
        <ListItem button >
            <ListItemText align="center">
              <span style={{ fontSize: '24px' }} > 2257 Record </span> 
            </ ListItemText>
          </ListItem>
        </NextLink>

        <Divider />

      </List>

      <Typography color="textSecondary" align="center">
        {`© ${new Date().getFullYear()} ${site?.sitename}`}
      </Typography>

    </Box>  
    );
}