import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { loginDialogContext } from '@/lib/AppContext';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1), 
    fontSize: 12,
    fontWeight: "bold",
  }
}));


export default function LoginButtons() {
  const classes = useStyles();  
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  
  const handleLogin = () => {
    setLoginDialog({ open: true, tab: 0 });
  };
  
  const handleSignup = () => {
    setLoginDialog({ open: true, tab: 1 });
  }


  return (
  <div>   
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleLogin}
      className={classes.button} >
      Log In
    </Button>

    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSignup}
      className={classes.button} 
    >
        Sign Up
    </Button>
  </div>
  )
}