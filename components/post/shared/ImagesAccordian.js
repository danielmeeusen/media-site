import React, { useState, useContext } from 'react';

import { Accordion, AccordionSummary, AccordionDetails, ListItem  } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';

import { ImagesList } from '@/components/post/shared';
import { imageViewerContext } from '@/lib/AppContext';


const useStyles = makeStyles((theme) => ({
  acordian: {
    backgroundColor: theme.palette.background.default,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      display: 'none',
    },
  },
  link: {
    color: theme.palette.custom.seventyFive,
    fontSize: '16px',
    margin: '0px 0px 0px 5px',
  },
  icon: {
    color: theme.palette.custom.seventyFive,
    margin: '0px 0px -2px -30px',
  }
}));

export default function ImagesAccordian({ post, desk }) {
  const classes = useStyles();
  const [ imageViewer, setImageViewer ] = useContext(imageViewerContext || { accordian: false, veiwer: false });
  const { images } = post;
 
  return (
    <Accordion 
      className={classes.acordian} 
      expanded={imageViewer.accordian} 
      onChange={()=> setImageViewer({...imageViewer, accordian: !imageViewer.accordian})}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="Images"
        id="Images"
        className={classes.summary} 
      >
        <ListItem button >
          <span className={classes.icon}> <ImageIcon /> </span>
          <span className={classes.link}> Images </span> 
        </ListItem>
      </AccordionSummary>

      <AccordionDetails style={{ margin: '0px -12px', padding: '0px' }}>
        <ImagesList images={images} desk={desk} />
      </AccordionDetails>
    </Accordion>
  );
}
