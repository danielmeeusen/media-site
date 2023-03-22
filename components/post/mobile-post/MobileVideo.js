import React, { useContext, useState, useEffect } from 'react';

import { Box, Button, Grid, Chip, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useCurrentUser } from '@/lib/user/hooks';
import { loginDialogContext, mobileBottomContext, editDialogContext, editPostContext } from '@/lib/AppContext';
import Link from '@/components/shared/Link';
import { subscribeLink } from '@/lib/user/utils';


export default function MobileVideo({ post }) {
  const [ user, { mutate } ] = useCurrentUser();
  const [ video, setVideo ] = useState(false);
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ editDialog, setEditDialog ] = useContext(editDialogContext);
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const { _id, title, videoThumbnail, promoStream, mainStream, mainDownload, videoLength } = post;
  const [ list, setList ] = useState(user?.watchlist.includes(_id));
  const subscribe = user ? subscribeLink(user) : '/404';

  useEffect(() => {
    setList(user?.watchlist.includes(_id))
  }, [post]);

  const handleSignup = () => {
    setLoginDialog({ open: true, tab: 1 });
    setMobileBottom('Account');
  }

  const toggleVideo = () => {
    setVideo(!video);
  }

  const handleEdit = () => {
    setEditPost(post);
    setEditDialog(true);
  }

  const handleWatchlist = async () => {
    setList(!list);
    const body = {
      postId: _id,
      title,
      add: !list,
    }
    const res = await fetch('/api/user/watchlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body),    
    });
    if(res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setList(!list);
    }
  }

  return (
    <Box>
      <Box style={{ margin: '0px -25px 0px -15px'}} >
      <div style={{ position: 'relative', paddingTop: '56.75%' }} >
        <iframe 
          poster={ videoThumbnail }
          src={ video ? mainStream : promoStream }
          loading="lazy" 
          style={{ border: 'none', position: 'absolute', top: '0', height: '100%', width: '100%' }} 
          allow="*"
          allowFullScreen={true}
          />
      </div>
      </Box>

      <Box style={{ margin: '7px -10px 7px -5px' }} >
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            { user && !user.subscribed ?
              <Button 
                style={{ borderRadius: '30px' }}
                variant="outlined" 
                color="primary"
                size="small"
                href={subscribe}
                target="_blank"
                startIcon={<PlayArrowIcon />}
                >
                  {`${Math.ceil(videoLength/60)} min video`}
              </Button>
              :
              <Button 
                style={{ borderRadius: '30px' }}
                variant="outlined" 
                color="primary"
                size="small"
                startIcon={<PlayArrowIcon /> }
                onClick={ user ? toggleVideo : handleSignup }
                >
                  {video ? 'trailer' : `${Math.ceil(videoLength/60)} min video` }
              </Button>
            }
          </Grid>

          <Grid item>
            <Box >
              {user && 
                <Chip 
                  color="secondary" 
                  icon={list ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />} 
                  label={list ? 'Saved' : 'Save' }
                  size="small"
                  onClick={handleWatchlist}
                />
              }
              { user?.subscribed && 
                <Link href={mainDownload} download={`${title}.mp4`} target="_blank" >
                  <Chip 
                    style={{ marginLeft: '5px'}}
                    color="secondary" 
                    icon={<GetAppIcon />} 
                    label="Download"
                    size="small"
                    clickable 
                  />
                </Link>
              }
              { user?.creator && 
                <IconButton
                  onClick={handleEdit}
                  style={{ padding: '3px', margin: '0px -15px 0px 0px' }}
                >
                  <MoreVertIcon />
                </IconButton>
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}