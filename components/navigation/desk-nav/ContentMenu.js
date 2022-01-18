import React, { useState } from 'react';
import { useCurrentUser } from '@/lib/user/hooks';
import { useSite } from '@/lib/site';
import FilterList from './DeskFilterList';
import Copyright from '../../shared/Copyright';

import { Toolbar, List, Divider, ListItem, ListItemText, Typography } from '@material-ui/core';
import NextLink from 'next/link'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  copyright: {
    marginTop: theme.spacing(2),
  },
}));


export default function ContentMenu() {
  const classes = useStyles();
  const [user] = useCurrentUser();
  const site = useSite();

  return (
    <>
      <Toolbar />
      <List dense>

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

        <NextLink href="/tos" passHref>
          <ListItem button >
            <ListItemText primary='Terms of Service'align="center" />
          </ListItem>
        </NextLink>

        <Divider />

      </List>


      <Typography variant="body2" color="textSecondary" align="center">
        {`© ${new Date().getFullYear()} ${site?.sitename}`}
      </Typography>
    </>
  );
}
