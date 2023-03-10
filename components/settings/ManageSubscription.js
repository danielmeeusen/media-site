import React, { useState, useContext } from 'react';
import date from 'date-and-time';

import { Button, Typography, Box, IconButton, Modal } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';
import { subscribeLink } from '@/lib/user/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginTop: '-200px',
  }
}));

export default function ManageSubscription() {
  const classes = useStyles();
  const [ user ] = useCurrentUser();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ confirm, setConfirm ] = useState(false);
  const { NextBillDate, PasswordRemovalDate, NextBillAmount } = user?.epoch?.Customer;
  const subscribe = user ? subscribeLink(user) : '/404';

  async function cancelSubscription() {
    setLoading(true);
    const res = await fetch('/api/user/epoch/cancel', {
      method: 'GET',
    });
    if (res.status === 200) {
      setMsg({ message: 'Your membership has been canceled.' });
      setLoading(false);
      setConfirm(false);
    } else {
      setMsg({ message: res.text(), isError: true });
      setLoading(false);
    }
  }

  const modal = (
    <Box className={classes.paper} >
      <IconButton onClick={() => setConfirm(false)} style={{ float: 'right' }}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <Box mt={2} style={{ padding: 30 }} >
      <Typography variant="body1" >
        Are you sure you want to cancel your subscription?
      </Typography>
      <Box mt={1} align="center" >
        <Msg msg={msg} />
      </Box>
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={cancelSubscription}
          style={{ borderRadius: '30px' }}
          >
          Yes Cancel Subscription
        </Button>
        </Box>
      </Box>
    </Box>
  );

    return (
      <>
        <Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={confirm}
          onClose={ () => { setConfirm(false) } }
          aria-labelledby="confirm-delete-account"
          aria-describedby="confirm-delete-account"
          >
          {modal}
        </Modal>

        <Box mt={-4} sx={{width: "100%"}} >
          <Box mb={1} align="center" >
            <Msg msg={msg} />
          </Box>
          <Box mb={3} >
            <Typography align='center' >
            { Date.parse(NextBillDate) ? 'Next Bill:' : Date.parse(PasswordRemovalDate) > Date.now() ? 'Subscription Expires:' : 'Not Currently Subscribed' } 
            </Typography>
            <Typography align='center' >
              { Date.parse(NextBillDate) ? NextBillAmount : null }
            </Typography>
            <Typography align='center' >
            { Date.parse(NextBillDate) ? date.format(new Date(NextBillDate), 'MMM DD, YYYY') : Date.parse(PasswordRemovalDate) > Date.now() ? date.format(new Date(PasswordRemovalDate), 'MMM DD, YYYY') : '' } 
            </Typography>
          </Box>

          <Box mb={1} >
            { Date.parse(NextBillDate) ?
              <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={ () => setConfirm(true) }
              style={{ borderRadius: '30px' }}
              >
                Cancel Subscription
              </Button>
              :
              <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              href={subscribe}
              target="_blank"
              style={{ borderRadius: '30px' }}
              >
                Subscribe
              </Button>
            }
          </Box>
      </Box>
    </>
    );  
}