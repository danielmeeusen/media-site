import React, { useState, useRef } from 'react';

import { Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import Link from '@/components/shared/Link';
import { useCurrentUser } from '@/lib/user/hooks';

const useStyles = makeStyles((theme) => ({
  stillSkeleton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  card: {
    backgroundColor: theme.palette.background.default,
    margin: '15px 8px',
  },
  videoContainer: {
    position: 'relative',
    paddingTop: "55%",
    overflow: 'hidden',
    borderRadius: '10px',
  },
  video: {
    top: 0,
    left: 0,
    position: 'absolute',
    maxWidth: '100%',
  },
  image: {
    top: 0,
    left: 0,
    position: 'absolute',
    maxWidth: '100%',
    opacity: '1',
    '&:hover': {
      transitionDelay: '1s',
      opacity: '0'
    }
  },  
  loading: {
    top: 0,
    left: 0,
    position: 'absolute',
    maxWidth: '100%',
    visibility: 'hidden'
  },
  title: {
    fontSize: '18px',
    fontWeight: '400',
    margin: '5px 0px -3px 0px',
    color: theme.palette.text.primary,
  },
  with: {
    display: 'inline', 
    fontSize: '16px',
    color: theme.palette.custom.seventyFive,
  },
  withLink: {
    color: theme.palette.custom.seventyFive,
    '&:hover': {
      color: theme.palette.text.primary,
    }
  },
  date: {
    color: theme.palette.custom.fifty,
  },
  featured: {
    margin: '0px 0px -10px 0px',
    fontStyle: 'italic',
    fontWeight: 400,
  }
}));

export default function DeskPostTile({ post, type }) {
  const classes = useStyles();
  const vidRef = useRef();
  const [ user ] = useCurrentUser();
  const [ loaded, setLoaded ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ hover, setHover ] = useState(false);
  const { _id, videoThumbnail, title, people, publishDate, promoVideo } = post;  
  var timer;

  const overImage = async () => {
    setHover(true);
    timer = setInterval(() => {
      if(progress < 100){
        return setProgress(progress += 10);
      }
      if(progress == 100) {
        clearInterval(timer);
        setProgress(0);
      }
    }, 100);
  }

  const leaveImage = async () => {
    clearInterval(timer);
    setProgress(0);
    setHover(false);
  }
  
  const mouseLeave = async () => {
    leaveImage();
    vidRef.current.pause();
  }
  
  return (
    <Box align="center" className={classes.card} >
      <div className={classes.videoContainer} >
        <Link 
          onMouseEnter={ () => vidRef.current.play() }
          onMouseLeave={mouseLeave}
          href={user?.subscribed ? `/post/members/${_id}` : `/post/${_id}`}  
        >
          <video 
            ref={vidRef}
            className={classes.video} 
            muted
            src={promoVideo}
            preload="metadata"
            />
            {!loaded && <Skeleton variant="rect" className={classes.stillSkeleton} /> }  
            <img 
              onMouseEnter={overImage}
              onMouseLeave={leaveImage}
              onLoad={ () => setLoaded(true) }
              className={ loaded ? classes.image : classes.loading }
              src={videoThumbnail}
              alt="main still for movie"
            />
          <LinearProgress 
            style={{ visibility: hover && progress > 0 ? 'visible' : 'hidden' }}
            variant="determinate" 
            value={progress} 
          />
        </Link>
      </div>

      {post.featured && type == 'all' &&<Typography color="primary" className={classes.featured}>Featured</Typography> }

      <Link href={user?.subscribed ? `/post/members/${_id}` : `/post/${_id}`}>
        <Typography className={classes.title}> {title.replaceAll('_',' ')} </Typography>
      </Link>

        {people.map( (person, i) => {
          return (
            <Typography variant="body2" className={classes.with} key={person} >
              <Link href={`/results?type=filter&keywords=${person}`} >
                <span className={classes.withLink} >{`${person.replaceAll('_', ' ')}`}</span>
              </Link>
              { people.length > 2 && ', ' }
              { i === people.length - 2 && ` and ` }
            </Typography>
          )}
        )}

      <Typography variant="body2" className={classes.date}>
        {publishDate}
      </Typography>    
    </Box>
    );
}