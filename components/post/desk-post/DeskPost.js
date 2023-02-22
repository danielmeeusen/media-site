import React, { useState } from 'react';

import { Container, Box, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Posts from '@/components/post/Posts';
import { DeskVideo } from '@/components/post/desk-post';
import { PostTags, PostSponsors, PostPeople, ImagesAccordian } from '@/components/post/shared'; 


const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '20px',
    fontWeight: '400',
    margin: '10px 0px 0px 0px',
  },
  date: {
    fontSize: '14px',
    color: theme.palette.custom.fifty,
    margin: '3px 0px 0px 0px',
  },
  more: {
    fontSize: '15px',
    margin: '15px 0px 0px 0px'
  }
}))

export default function DeskPost({ post, desk }) {
  const classes = useStyles();
  let { tags, publishDate, people } = post;
  const title = post.title.replaceAll('_', ' ');
  const query = {
    type: 'more',
    keywords: tags,
    not: post.title,
    code: post.shootCode
  };
  query.keywords = query.keywords.concat(people);
  query.keywords.push(post.title);
 
  return (
    <Container maxWidth="lg" >
        
      <DeskVideo post={ post } desk={desk} />

      <div className={classes.title}>{ title }</div>

      <PostPeople post={post} />

      <div className={classes.date}>{publishDate}</div> 
      
      <PostSponsors post={post} />

      <ImagesAccordian post={post} desk={desk} />

      <PostTags post={post} />

      <div className={classes.more}>
        More Like this:
      </div>

      <Box mx={-2} >
        <Posts desk={desk} query={query} />
      </Box>
            
    </Container>
  );
}
