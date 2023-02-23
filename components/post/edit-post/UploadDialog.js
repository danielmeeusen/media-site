import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { Dialog, useMediaQuery, Typography, Box, Button, Grid, IconButton } from '@material-ui/core';
import { useTheme, alpha } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { uploadDialogContext, mobileBottomContext, newPostContext, loadingContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import Msg from '@/components/shared/Msg';
import { blankPost } from '@/lib/post/blankPost';
import { EditDates, EditImages, EditPeople, EditTags, EditSponsors, EditTitle, EditVideo } from '@/components/post/edit-post';


export default function UploadDialog() {
  const theme = useTheme();
  const [ user ] = useCurrentUser();
  const [ uploadDialog, setUploadDialog ] = useContext(uploadDialogContext);
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ newPost, setNewPost ] = useContext(newPostContext);
  const [ loading, setLoading ] = useContext(loadingContext);
  
  useEffect(() => {
    if(!user?.creator){
      setUploadDialog(false);
      setMobileBottom(false);
    }
  }, [user]);

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = { newPost };
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const resPost = await res.json();
      setUploadDialog(false);
      setNewPost(blankPost);
      setLoading(false);
      Router.push(`/post/members/${resPost._id}`)
    } else {
      setMsg({ message: await res.text(), isError: true });
      setLoading(false);
    }
  }

  const handleClose = () => {
    setUploadDialog(false);
    setMobileBottom('Home');
  };

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      open={ uploadDialog || mobileBottom == 'Add' }
      onClose={handleClose}
      aria-labelledby="upload-dialog"
      scroll="paper"
    >
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Box mx={4}></Box>

        <Typography variant="h6">New Post</Typography>

        <IconButton aria-label="close" onClick={handleClose} style={{ float: 'right' }}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Grid>

        <Box mb={10} mt={-1} mx={3} >
          <Box>
            {msg.message && <Msg msg={msg} />}
          </Box>
            
            <EditTitle add={true} />

            <EditPeople add={true} />

            <EditTags add={true} />

            <EditSponsors add={true} />

            <EditDates add={true} />

            <EditImages add={true} />

            <EditVideo add={true} />

            <Button
              onClick={createPost}
              fullWidth
              variant="contained"
              color="primary"
              >
              Create Post
            </Button>

      </Box>
    </Dialog>
  );
}