import React, { useState, useContext } from 'react';
import Router from 'next/router';

import { Box, Button, Typography, Modal, IconButton  } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginTop: '-200px',
  },
  modalText: {
    color: theme.palette.custom.eightyFive,
  },
}));

export default function DeleteAccount() {
  const classes = useStyles();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ confirm, setConfirm ] = useState(false);

  async function handleDeleteAccount(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      password: e.currentTarget.password.value
    }
    const res = await fetch('/api/user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      setLoading(false);
      setConfirm(false);
      Router.push('/');
    } else {
      setMsg({ message: await res.text(), isError: true });
      setLoading(false);
    }
  }

    const modal = (
      <Box className={classes.paper} >
        <IconButton onClick={() => setConfirm(false)} style={{ float: 'right' }}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box style={{ padding: 30 }} >
          <Typography variant="body1" >
            Please enter password to delete your account:
          </Typography>
          <Box mt={1} align="center" >
            <Msg msg={msg} />
          </Box>
          <form onSubmit={handleDeleteAccount}>
            <PasswordInput label="Password" id="password" />
            <Box mt={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                >
                Delete User Account
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    );

  return (
    <>
      <Modal
        style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
        open={confirm}
        onClose={ () => { setConfirm(false) } }
        aria-labelledby="confirm-delete-account"
        aria-describedby="confirm-delete-account"
      >
        {modal}
      </Modal>

      <Box mt={-3} sx={{ width: "100%" }} >
        <Box mt={-1} align="center" >
          <Msg msg={msg} />
        </Box>
        <Typography variant="body1" className={classes.modalText} >
          Please note that deleting your account will remove all favorites and forfit any current rentals and subscriptions. If you wish to save your favorites but cancel your subscription please click the subscription menu above. 
        </Typography>
        <Box my={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ () => setConfirm(true) }
            >
            Delete User Account
          </Button>
      </Box>
    </Box>
    </>
  );
};
