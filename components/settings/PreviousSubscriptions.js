import React, { useState, useContext } from 'react';

import { Button, Typography, Box, IconButton, Modal } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';

const useStyles = makeStyles((theme) => ({
  modal: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  paper: {
    width: 500,
    backgroundColor: theme.palette.secondary.light,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 3, 0)
  },
  submit: {
    margin: theme.spacing(0, 0, 3, 0),
  }
}));

export default function PreviousMessage() {
  const classes = useStyles();
  const [ user ] = useCurrentUser();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ confirm, setConfirm ] = useState(false);
  const { NextBillDate, PasswordRemovalDate, NextBillAmount } = user?.epoch?.Customer;
  
  async function cancelSubscription(e) {
    setLoading(true);    
  };

  const modal = (
    <Box className={classes.paper} >
      <IconButton onClick={() => setConfirm(false)} style={{ float: 'right' }}>
        <CloseIcon/>
      </IconButton>
      <Box mt={4} style={{ padding: 30 }} >
      <Typography variant="body1" >
        Are you sure you want to cancel your subscription?
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={cancelSubscription}
      >
        Yes Cancel Subscription
      </Button>
      </Box>
    </Box>
  );

    return (
      <>
        <Modal
          className={classes.modal}
          open={confirm}
          onClose={ () => { setConfirm(false) } }
          aria-labelledby="confirm-delete-account"
          aria-describedby="confirm-delete-account"
          >
          {modal}
        </Modal>
        <Box mt={-3} sx={{width: "100%"}} >
          <Box mb={1} align="center" >
            <Msg msg={msg} />
          </Box>
            <Typography className={classes.text}>
              { NextBillDate ? `Next Bill: | ${NextBillDate} |  ${NextBillAmount}` : PasswordRemovalDate ? `Subscription Expires: ${PasswordRemovalDate}` : 'No Current Subscriptions :(' }
            </Typography>
          { NextBillDate ?
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ () => setConfirm(true) }
            >
            Cancel Subscription
          </Button>
          :
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ () => setConfirm(true) }
            >
            Subscribe
          </Button>
          }
      </Box>
    </>
    );  
}