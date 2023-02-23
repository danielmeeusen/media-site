import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { Dialog, useMediaQuery, Typography, Box, Button, Grid, IconButton, DialogContent, Modal, FormControlLabel, Switch  } from '@material-ui/core';
import { useTheme, makeStyles, alpha } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { editDialogContext, editPostContext, loadingContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Msg from '@/components/shared/Msg';
import { EditDates, EditImages, EditPeople, EditTags, EditSponsors, EditTitle, EditVideo } from '@/components/post/edit-post';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginTop: '-200px',
  },
  text: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 3, 0)
  }
}));

export default function EditDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const [ user ] = useCurrentUser();
  const [ editDialog, setEditDialog ] = useContext(editDialogContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ confirm, setConfirm ] = useState(false);

  useEffect(() => {
    if(!user?.creator){
      setEditDialog(false);
    }
  }, [user]);

  const handleEditPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    let body = { editPost };
    const res = await fetch('/api/post', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const resPost = await res.json();
      setLoading(false);
      setEditDialog(false);
      Router.reload();
    } else {
      setMsg({ message: await res.text(), isError: true });
      setLoading(false);
    }
  }

  const deletePost = async (e) => {
    e.preventDefault(e);
    setLoading(true);
    const body = { id: editPost._id };
    const res = await fetch('/api/post', {
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
      <Box mt={2} style={{ padding: 30 }} >
      <Typography variant="body1" >
        Are you sure you want to delete this post?
      </Typography>
      <Box mt={1} align="center" >
        <Msg msg={msg} />
      </Box>
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={deletePost}
          >
          delete post
        </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      // maxWidth='lg'
      open={ editDialog }
      onClose={() => setEditDialog(false)}
      aria-labelledby="edit-dialog"
    >
      <Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={confirm}
          onClose={ () => { setConfirm(false) } }
          aria-labelledby="confirm-delete-account"
          aria-describedby="confirm-delete-account"
          >
          {modal}
        </Modal>
      <DialogContent style={{ 
        overflowX: 'hidden',
        overflowY: 'auto', 
        padding: '15px', 
        margin: '-15px 0px 0px 0px' 
        }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Box mx={4}></Box>

          <Typography variant="h6">Edit Post</Typography>

          <IconButton aria-label="close" onClick={() => setEditDialog(false)} style={{ float: 'right' }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Grid>

        <Box>
          {msg.message && <Msg msg={msg} />}
        </Box>
          
          <EditTitle add={false} />

          <EditPeople add={false} />

          <EditTags add={false} />

          <EditSponsors add={false} />
          
          <EditDates add={false} />

          <EditImages add={false} />
          
          <EditVideo add={false} />

          <Box my={1} align="center" >
            <FormControlLabel
              name="featured"
              control={
                <Switch 
                  color="primary"
                  checked={editPost.featured} 
                  onChange={() => { setEditPost({...editPost, featured: !editPost.featured })} } 
                />}
              label="Featured"
              />
          </Box>

          <Box my={1} align="center" >
            <FormControlLabel
              name="encode"
              control={
                <Switch 
                  color="primary"
                  checked={editPost.encode} 
                  onChange={() => { setEditPost({...editPost, encode: !editPost.encode}) }} 
                />}
              label="Re-Encode Video"
              />
          </Box>

          <Button
            onClick={handleEditPost}
            fullWidth
            variant="contained"
            color="primary"
            >
            Update Post
          </Button>

        <Box mt={2} mb={8} >
          <Button
            onClick={() => setConfirm(true)}
            fullWidth
            variant="outlined"
            color="primary"
            >
            Delete Post
          </Button>
        </Box>

    </DialogContent>
    </Dialog>
  );
}