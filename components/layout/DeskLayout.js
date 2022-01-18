import React, { useContext, useState } from 'react';
import clsx from 'clsx';

import {Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TopDesk from '../navigation/desk-nav/TopDesk';

import { leftDeskMenuContext } from '../../lib/AppContext';

let drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}))


export default function DeskLayout(props) {
  const { children } = props; 
  const classes = useStyles();
  const [ leftDeskMenu, setLeftDeskMenu ] = useContext(leftDeskMenuContext);

  return (
    <>
      <TopDesk />
      <div className={clsx(classes.content, {
      [classes.contentShift]: leftDeskMenu,
      })}>
      <Container>
        <Box my={10} textAlign='center'>
          { children }
        </Box>
      </Container>
      </div>
      </>
    ) 
}


