import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

import { Dialog, IconButton, Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { imageViewerContext } from '@/lib/AppContext';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const useStyles = makeStyles((theme) => ({

}));

export default function ImageViewer({ images, desk }) {
  const classes = useStyles();
  const [ imageViewer, setImageViewer ] = useContext(imageViewerContext || { viewer: false, index: 0 });

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setImageViewer({ ...imageViewer, viewer: false });
    }
  }

  return (
    <Modal
      open={imageViewer.viewer}
      onClose={() => setImageViewer({ ...imageViewer, viewer: false })}
      style={{ textAlign: 'center' }}
    >
      <>
        <Box align="right" >
          <IconButton 
            onClick={() => setImageViewer({ ...imageViewer, viewer: false })} >
            <CloseIcon style={{ fontSize: '45px' }} />
          </IconButton>
        </Box>
          {desk &&
          <>
            <IconButton 
              style={{ float: 'right', clear: 'right', marginTop: '40vh'  }} 
              onClick={() => setImageViewer({...imageViewer, viewer: true, index: imageViewer.index !== images.length-1 ? imageViewer.index+1 : 0 })} 
              >
              <KeyboardArrowRightIcon style={{ fontSize: '50px' }} />
            </IconButton>
            <IconButton 
            style={{ float: 'left', marginTop: '40vh' }} 
            onClick={() => setImageViewer({ ...imageViewer, viewer: true, index: imageViewer.index != 0 ? imageViewer.index-1 : images.length-1 })} 
            >
              <KeyboardArrowLeftIcon style={{ fontSize: '50px' }} />
              </IconButton>
            </>
          }
        <BindKeyboardSwipeableViews
          index={imageViewer.index}
          onChangeIndex={(index)=>setImageViewer({ ...imageViewer, index})}
          style={{ textAlign: 'center' }}
          onClick={() => setImageViewer({ ...imageViewer, viewer: false })}
          >
          {images.map((image, index) => {
            return (
              <img
                key={index}
                style={{ maxHeight: "90vh", maxWidth: "80vw"}} 
                src={image}  
                />
              );
            })
          }
        </BindKeyboardSwipeableViews>
      </>
    </Modal>
  )
}