import React from 'react';

import { Typography, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    float: 'left',
    fontSize: '14px',
    width: '100%',
    margin: '3% 0% 3% 0%',
    color: theme.palette.custom.sixtyFive,
  }
}));

export default function SettingsHeader({header, content}) {
  const classes = useStyles();

  return (
    <Grid 
      container
      direction="row" 
      justifyContent="space-between"   
      alignItems="center"
    > 
      <div>
        <div className={classes.header}>{header}</div>
        <Typography align="left" >{content}</Typography>
      </div>
      <Typography>edit</Typography>
    </Grid>
  );
}