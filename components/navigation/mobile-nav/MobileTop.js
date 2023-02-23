import React from 'react';
import { useRouter } from 'next/router';

import { AppBar, Toolbar, Typography, Box, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    maxHeight: 45,
    },
    toolBar: {
      minHeight: 45,
    },
    back: {
      fontSize: "16px",
      marginLeft: "-15px",
      marginTop: "-10px"
    },
    title: {
      margin: '-2px -5px 0px 0px',
      color: theme.palette.text.primary
    },
}));

export default function MobileTop() {
  const classes = useStyles();
  const Router = useRouter();

  return (
    <Box>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
        <Grid
          container
          justifyContent="space-between"
        >
        { location.pathname !== '/' &&
        <Grid item>
          <IconButton onClick={ () => Router.back() } className={classes.back} >
            <ArrowBackIosIcon />
          </IconButton>
          </Grid>
        }
          <Grid item>
            <Link href="/" >
              <Typography  variant="h6" className={classes.title}>
                MediaSite
              </Typography>
            </Link>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
