import React, { useContext, useState } from 'react';

import {Typography, Box, TextField, Button, Grid, IconButton, FormControl, MenuItem, InputLabel, Select } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { editPostContext, newPostContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';


export default function EditImages({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ newImage, setNewImage ] = useState('');
  const [ anchor, setAnchor ] = useState('center');

  const editImages = () => {
    if(newImage == ''){
      setMsg({ message: 'no image entered', isError: true });
    }
    let imageArr = add ? newPost.images : editPost.images;

    if(newImage && imageArr.indexOf(newImage) < 0){
      imageArr.push(newImage);
      if(add){
        setNewPost({...newPost, images: imageArr});
      } else {
        setEditPost({...editPost, images: imageArr});
      }
      setNewImage('');
    }
  }

  const thumbnail = (post, add) => (
    post.videoThumbnail ?
      <Box align="center" mb={-2}>
        <FormControl variant="outlined">
          <InputLabel>Anchor</InputLabel>
          <Select
            value={anchor}
            onChange={(e, v) => {
              setAnchor(e.target.value);
              add ?
                setNewPost({ ...newPost, videoThumbnail: `${newPost.videoThumbnail.split('?')[0]}?aspect_ratio=16:9&crop_gravity=${e.target.value}` })
                :
                setEditPost({ ...editPost, videoThumbnail: `${editPost.videoThumbnail.split('?')[0]}?aspect_ratio=16:9&crop_gravity=${e.target.value}` });
            } }
            label="Anchor"
          >
            <MenuItem>
            </MenuItem>
            <MenuItem value={'center'}>Center</MenuItem>
            <MenuItem value={'north'}>North</MenuItem>
            <MenuItem value={'south'}>South</MenuItem>
            <MenuItem value={'east'}>East</MenuItem>
            <MenuItem value={'west'}>West</MenuItem>
          </Select>
        </FormControl>
        <img src={`${post.videoThumbnail.split('?')[0]}?aspect_ratio=16:9&crop_gravity=${anchor}`} width="100%" />
      </Box>
      :
      newPost.images[0] && <Typography align="center">please select thumbnail</Typography>
  )

  const images = (post, add) => (
    <Grid container direction="row" justifyContent="space-around" alignItems="center">
      {post.images?.length ?
        post.images.map((image, i) => {
          return (
            <Grid item style={{ width: "33%"}} key={image}>
              <IconButton 
                style={{ float: 'right', marginRight: '-15px' }}
                onClick={() => {
                  add ?
                  setNewPost({...newPost, images: post.images.filter(i => i !== image)}) 
                  :
                  setEditPost({...editPost, images: post.images.filter(i => i !== image)})}              
                  } 
                >
                <CloseIcon fontSize="large" />
              </IconButton>
              <IconButton 
                style={{ margin: "-25px -10px -25px -10px" }} 
                onClick={() => {
                  add ?
                  setNewPost({...newPost, videoThumbnail: `${image}?aspect_ratio=16:9&crop_gravity=${anchor}` })
                  :
                  setEditPost({...editPost, videoThumbnail: `${image}?aspect_ratio=16:9&crop_gravity=${anchor}` })
                }}  
              >
              <img src={image} width="100%"/>
              </IconButton>
            </Grid>
          );
        })
      :
        <Typography align="center">please upload image</Typography>
      }
      </Grid>
  )

  return (
    <Box>  
      <Box>
        {msg.message && <Msg msg={msg} />}
      </Box> 
      {thumbnail(add ? newPost : editPost, add)}    

      {images(add ? newPost : editPost, add)}

      <Box mb={2} mt={3}>
        <Box mb={1}>
          <TextField
            value={newImage}
            onChange={(e) => {setNewImage(e.target.value)}}
            variant="outlined"
            fullWidth
            id="newImage"
            label="Add Image"
            name="newImage"
            /> 
        </Box>
        <Button
          onClick={editImages}
          fullWidth
          variant="contained"
          color="primary"
          >
          Add Image
        </Button>
      </Box>
    </Box>
  );
}