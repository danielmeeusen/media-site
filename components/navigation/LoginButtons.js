import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1), 
    fontSize: 12,
    fontWeight: "bold",
  }
}));

export default function LoginButtons() {
  const classes = useStyles();  

  return (
  <div>   
    <Link href="/login">
      <Button variant="contained" color="secondary" className={classes.button} >Log In</Button>
    </Link>

    <Link href="/signup">
      <Button variant="contained" color="primary" className={classes.button} >Sign Up</Button>
    </Link>     
  </div>
  )
}