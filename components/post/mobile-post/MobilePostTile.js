import React, { useState, useRef, useContext, useEffect } from 'react';
import date from 'date-and-time';
import useInView from "react-cool-inview";

import { Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import Link from '@/components/shared/Link';
import { useCurrentUser } from '@/lib/user/hooks';
import { prevVideoContext } from '@/lib/AppContext';

const useStyles = makeStyles((theme) => ({
  stillSkeleton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: '10px',
  },
  card: {
    backgroundColor: theme.palette.background.default,
    margin: '12px 7px',
  },
  videoContainer: {
    position: 'relative',
    paddingTop: "55%",
    overflow: 'hidden',
    borderRadius: '10px',
    zIndex: '1000'
  },
  hideVideo: {
    top: 0,
    left: 0,
    position: 'absolute',
    maxWidth: '100%',
    visibility: 'hidden',
  },
  showVideo: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  title: {
    margin: "5px 0 -3px 0",
    fontSize: "18px",
    fontWeight: "400",
    color: theme.palette.text.primary,
  },
  with: {
    display: 'inline', 
    color: theme.palette.custom.seventyFive,
  },
  withLink: {
    color: theme.palette.custom.seventyFive,
    '&:hover': {
      color: theme.palette.text.primary,
    }
  },
  date: {
    fontSize: "14px",
    color: theme.palette.custom.fifty,
  },
  featured: {
    margin: '0px 0px -10px 0px',
    fontStyle: 'italic',
    fontWeight: 400,
  }
}));

export default function MobilePostTile({ post, type }) {
  const classes = useStyles();
  const vidRef = useRef(null);
  const [ user ] = useCurrentUser();
  const [ hover, setHover ] = useState(false);
  const [ prevVideo, setPrevVideo ] = useContext(prevVideoContext);
  const [ loaded, setLoaded ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  let { _id, title, people, publishDate, promoVideo, videoThumbnail, videoLength } = post;
  let timer;

  useEffect(() => {
    if(prevVideo && prevVideo !== vidRef) {
      setHover(false);
    }  
  }, [prevVideo, progress]);
  
  const mouseOver = async () => {  
    timer = setInterval(() => {
      if(progress < 100){
        return setProgress(progress += 10);
      }
      if(progress >= 80) {
        vidRef?.current?.play();
        prevVideo?.current?.pause();
        setHover(true);
        setPrevVideo(vidRef);
        clearInterval(timer);
        setProgress(0);
      }
    }, 50);
  }

  const mouseLeave = async () => {
    vidRef.current.pause();
    clearInterval(timer);
  }   
  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    // trackVisibility: true,    
    // delay: 3000,
    // rootMargin: "-35% 0% -35% 0% ",
    rootMargin: "0% 0% 0% 0% ",

    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
      // setHover(true);
      // vidRef.current.play();
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
      vidRef.current.pause();
      setHover(false);
    },
  });
  
  return (
    <Box align="center" className={classes.card} >
      <div className={classes.videoContainer} >
        <Link 
          ref={ observe }
          onTouchStart={ mouseOver }
          onClick={ mouseLeave }
          href={user?.subscribed ? `/post/members/${_id}` : `/post/${_id}`}
        >
          <video 
            ref={vidRef}
            muted
            playsInline
            poster={videoThumbnail}
            src={promoVideo}
            preload="metadata"
            className={hover ? classes.showVideo : classes.hideVideo} 
          />
          {!loaded && <Skeleton variant="rect" className={classes.stillSkeleton} /> }  
          <img 
            onLoad={ () => setLoaded(true) }
            className={ loaded && !hover ? classes.showVideo : classes.hideVideo }
            src={videoThumbnail}
            alt="main still for movie"
          />
          <LinearProgress 
            style={{ visibility: progress > 0 ? 'visible' : 'hidden' }}
            variant="determinate" 
            value={progress} 
          />
        </Link>
      </div>

      {post.featured && type == 'all' && <Typography color="primary" className={classes.featured}>Featured</Typography> }

      <Link href={user?.subscribed ? `/post/members/${_id}` : `/post/${_id}`}>
        <Typography className={classes.title}>{`${title.replaceAll('_', ' ')}`}</Typography>
      </Link>
      
      <Box my={-.3}>
        {people.map( (person, i) => {
          return (
            <Typography className={classes.with} key={person} >
              <Link href={`/results?type=filter&keywords=${person}`} >
                <span className={classes.withLink} >{person.replaceAll('_',' ')}</span>
              </Link>
              { people.length > 2 && ', ' }
              { i === people.length - 2 && ` and ` }
            </Typography>
          )}
        )}
      </Box>

      <Typography className={classes.date}>
        {`${publishDate} - ${Math.ceil(videoLength/60)} min`}
      </Typography>    
    </Box>
    );
}