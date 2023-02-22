import React, { useContext } from 'react';

import { Grid, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { imageViewerContext } from '@/lib/AppContext';
import { ImageViewer } from '@/components/post/shared';

const useStyles = makeStyles((theme) => ({

}));

export default function ImagesList({ images, desk }) {
  const classes = useStyles();
  const [ imageViewer, setImageViewer ] = useContext(imageViewerContext || { accordian: true, viewer: false });

  return (
    <>
      <ImageViewer images={images} desk={desk} />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        {images.map((image, index) => {
          return (
            desk ?
              <Grid 
                item 
                sm={12} md={6} lg={4}
                key={index} 
                onClick={() => setImageViewer({ ...imageViewer, viewer: true, index })}
                style={{ cursor: 'pointer' }} 
                >
                <Box mx={.5} my={.2}>
                  <img src={image} width="100%"/>
                </Box>
              </Grid>
              :
              <Grid 
                item 
                sm={12} md={6} lg={4}
                key={index} 
                onClick={() => setImageViewer({ accordian: false, viewer: false })}
              >
                <Box my={.2}>
                  <img src={image} width="100%" />
                </Box>
              </Grid>
              );
          })
        }
      </Grid>
    </>
  );
}
