import React, { useContext } from 'react';
import useInView from "react-cool-inview";

import { Grid, useMediaQuery, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { sortContext } from '@/lib/AppContext';

import DeskPostTile from '@/components/post/desk-post/DeskPostTile';
import DeskPostTileSkeleton from '@/components/post/desk-post/DeskPostTileSkeleton';
import MobilePostTile from '@/components/post/mobile-post/MobilePostTile';
import MobilePostTileSkeleton from '@/components/post/mobile-post/MobilePostTileSkeleton';
import { usePostPages } from '@/lib/post';

export default function Posts({ query }) {
  const theme = useTheme();
  const [ sort, setSort ] = useContext(sortContext);
  let width = {
    xs: useMediaQuery(theme.breakpoints.up('xs')),
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  };
  const keywords = query?.keywords || undefined;
  const type = query?.type || 'all';
  const not = query?.not || undefined;
  const code = query?.code || undefined;
  const PAGE_SIZE = width.lg && type !=='more' ? 24 : 12; 

  const { data, error, size, isLoadingInitialData, setSize, isLoadingMore, isReachingEnd } = usePostPages({ limit: PAGE_SIZE, keywords, type, not, sort, code });
  
  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "0px 0px",
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      // Pause observe when loading data
      unobserve();
      // Load more data
      setSize(size + 1);
    },
  });

  let desk = width.md;
  
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []; 

  return (
    <>
      {desk && data &&
        <Box mx={1.2}>
          <Grid container direction="row">
            {posts.map((post, i) => {
              return (
                <Grid item key={i} sm={12} md={6} lg={4} xl={3} >
                    <div ref={type == 'more' ? null : i === (PAGE_SIZE*size)-5 ? observe : null}>
                      <DeskPostTile key={post._id} post={post} type={type} />
                    </div>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        }

      {!desk &&
        <Box mx={.3}>
          <Grid container direction="row" >
            {posts.map((post, i) => {
              return (
                <Grid item key={i} xs={12} sm={6} >
                  <div ref={type == 'more' ? null : i === (PAGE_SIZE*size)-5 ? observe : null}>
                    <MobilePostTile key={post._id} post={post} type={type} />
                  </div>
                </Grid>
              )
            })}
            </Grid>
          </Box>
      }
      <Box mx={1.2}>
        {desk && isLoadingMore && !isReachingEnd && <DeskPostTileSkeleton pageSize={isLoadingInitialData ? 12 : width.xl ? 4 : width.lg ? 3 : 2 } desk={desk} type={type} /> }
      </Box>
      
      <Box mx={.3}>
        {!desk && isLoadingMore && !isReachingEnd &&  <MobilePostTileSkeleton pageSize={isLoadingInitialData ? 4 : width.sm ? 2 : 1 } desk={desk} /> }
      </Box>
    </>
  );
};


