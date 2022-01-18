import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useCurrentUser } from '@/lib/user/hooks';


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1), 
    fontSize: 12,
    fontWeight: "bold",
  }
}));

export default function AccountButton() {
  const classes = useStyles();  
  const [user, { mutate }] = useCurrentUser();

  
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };

  return (
      <Button 
      className={classes.button}
      variant="contained" 
      color="secondary" 
      onClick={handleLogout}
      >
        Log Out
      </Button>
  )
}