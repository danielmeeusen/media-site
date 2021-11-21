import React, { useState } from 'react';
import { Dialog, Button, Container, Typography, Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
  bgWrap: {
    position: 'fixed',
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    backgroundPositionY: 'top',
    overflow: 'hidden',
    opacity: '0.35',
    zIndex: 0
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItmes: 'center',
    zIndex: -1
  },  
  title: {
    zIndex: 1,
    marginBottom: 10,
  },
  warning: {
    zIndex:1,
    marginBottom: 10,
  },
  text: {
    zIndex: 1,
    marginBottom: 30
  },
  button: {
    marginBottom: 15,
    width: '100%',
    zIndex: 1
  },
  linkText: {
    zIndex: 1,
    marginTop: 15,
  },
  link: {
    alignText: 'center',
    fontSize: 14,
    color: 'white',
    zIndex: 1,
    "&:hover": {
      textDecoraction: 'underline',
    },
  },
}));

export default function Warning() {
  const classes = useStyles();
  const [warning, setWarning] = useState(window.localStorage.getItem('warning') || false);

  const handleClose = () => {
    setWarning(!warning);
    window.localStorage.setItem('warning', !warning);
  };

  return (
      <Dialog fullScreen open={!warning} onClose={handleClose} >
        <div className={classes.bgWrap} />
        <Container maxWidth="sm">
        <div className={classes.paper}>

          <Typography variant='h2' align='center' className={classes.title}>
            Media Site
          </Typography>

          <Typography variant='h5' align='center' className={classes.warning}>
            Content Warning:
          </Typography>

          <Typography variant="body2" align='center' className={classes.text}>
          This is where you'd place a content warning on your site if you'd like one. 
          </Typography>

          <Typography variant='h5' align='center' className={classes.warning}>
            Privacy Policy:
          </Typography>

          <Typography variant="body2" align='center' className={classes.text}>
          This is where you'd place your privacy policy if you'd like to put it here otherwise there is a smaller option later. 
          </Typography> 
      

          <div className={classes.buttons}>   
              <Button variant="contained" color="primary" onClick={handleClose} className={classes.button} >
                Enter
                </Button>

            <Link style={{textDecoration: 'none'}} href="https://www.google.com/search?q=parental+controls">
              <Button variant="contained" color="secondary" className={classes.button} >
                Leave
                </Button>
            </Link>     
          </div>
          <Typography align="center" className={classes.linkText}>
          <Link href="/record" className={classes.link}>
          Link to Content Policy
          </Link> 
          </Typography>

          <Typography align="center" className={classes.linkText} >
          <Link href="/contact" className={classes.link}>
            Contact
          </Link>
          </Typography>

          <Typography align="center" className={classes.linkText} >
          <Link href="/privacy" className={classes.link}>
          Privacy Policy
          </Link>
          </Typography>

        </div>
        </Container>
      </Dialog>
  );
}