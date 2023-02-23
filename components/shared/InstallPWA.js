import React, { useState } from 'react';

import { Dialog, Button, Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    padding: 30,
  },  
  text: {
    marginTop: 10,
  },
  button: {
    width: '100%',
    marginTop: 20,
  }
}));

export default function InstallPWA({ ua, displayMode }) {
  const classes = useStyles();
  const [install, setInstall] = useState(localStorage.getItem('install') || false);

  const handleDismiss = () => {
    setInstall(true);
    localStorage.setItem('install', true);
  };

  if (!install && displayMode == 'standalone') {
    handleDismiss();
  } 

  return (
  <Dialog 
    fullWidth
    open={ua?.isIos && !install}
    onClose={handleDismiss}
    >
      <div className={classes.background}>
        <Typography variant='h6' align='center'>
          To Install App:
        </Typography> 

        <Typography className={classes.text}>
        <img src='/icon/safari-icon.svg' alt='ios-safari-icon' height="25" style={{ marginBottom: '-7px', marginLeft: '-7px' }} /> 1) Open App in 'Safari'
        </Typography>

        <Typography className={classes.text} >     
        <img src='/icon/Ei-share-apple.svg' alt='ios-share-icon' height="35" style={{ marginBottom: '-10px', marginLeft: '-12px', marginRight: '-3px' }} /> 2) Press 'Share'
        </Typography>

        <Typography style={{ marginTop: '13px'}} >     
        <AddBoxOutlinedIcon style={{ marginBottom: '-5px', marginLeft: '-5px' }} /> 3) Press 'Add to Home Screen'
        </Typography>

        <Box align='center'>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleDismiss}
            className={classes.button}
            >
              Okay Got it
          </Button>
          </Box>
      </div>
  </Dialog>
  );
}
