import React, { useState } from 'react';

import { Button, Typography, Box, SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import MaximizeRoundedIcon from '@material-ui/icons/MaximizeRounded';

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    padding: "10px 30px 40px 30px",
    borderRadius: "20px"
  },  
  handle: {
    width: "100%",
    textAlign: 'center',
    margin: '-5px 0px -25px 0px',
    color: theme.palette.secondary.dark,
    fontSize: "45px",
  }
}));

export default function InstallPWA({ ua, displayMode }) {
  const classes = useStyles();
  const [install, setInstall] = useState(localStorage.getItem('install') || false);

  const handleDismiss = () => {
    setInstall(false);
    localStorage.setItem('install', false);
  };

  if (!install && displayMode == 'standalone') {
    handleDismiss();
  } 

  return (
  <SwipeableDrawer 
    PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
    fullWidth
    anchor="bottom"
    disableSwipeToOpen={true}
    open={ua?.isIos && !install}
    onClose={handleDismiss}
    onOpen={()=>{}}
  >
      <div className={classes.background}>
        <MaximizeRoundedIcon fontSize="large" className={classes.handle} />
        <Typography variant='h5' align='center'>
          To Install App:
        </Typography> 

        <Typography>
        <img 
          src='/icon/safari-icon.svg'
          alt='ios-safari-icon' height="25" 
          style={{ margin: '25px 12px -7px 5px' }} 
        /> 
         1) Open App in 'Safari'
        </Typography>

        <Typography>     
        <img 
          src='/icon/Ei-share-apple.svg' 
          alt='ios-share-icon' height="35" 
          style={{ margin: '15px 10px -11px 0px' }} 
        /> 
         2) Press 'Share'
        </Typography>

        <Typography>     
        <AddBoxOutlinedIcon style={{  margin: '20px 12px -7px 7px' }} />
         3) Press 'Add to Home Screen'
        </Typography>

        <Box align='center' my={5}>
          <Button 
            style={{ borderRadius: '30px', width: '100%' }}
            variant="contained" 
            color="primary" 
            onClick={handleDismiss}
            >
              Okay Got it
          </Button>
          </Box>
      </div>
  </SwipeableDrawer>
  );
}
