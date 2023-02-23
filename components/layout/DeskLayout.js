import React, { useContext } from 'react';
import dynamic from "next/dynamic";
import clsx from 'clsx';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { deskMenuContext } from '@/lib/AppContext';
const DeskTop = dynamic(() => import('@/components/navigation/desk-nav/DeskTop'));

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
    marginLeft: 240,
  },
}))


export default function DeskLayout({ children }) {
  const classes = useStyles();
  const [ deskMenu, setDeskMenu ] = useContext(deskMenuContext);

  return (
    <>
      <DeskTop />
      <div className={clsx(classes.content, {
      [classes.contentShift]: deskMenu,
      })}>
        <Box my={7}>
          { children }
        </Box>
      </div>
      </>
    ) 
}


