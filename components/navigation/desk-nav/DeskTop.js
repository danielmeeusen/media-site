import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import {AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';

import { deskMenuContext, deskAccountContext, uploadDialogContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import { DarkTooltip, Link } from '@/components/shared';
import { DeskMenu, DeskAccount, DeskSearch, LoginButtons} from '@/components/navigation/desk-nav';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    maxHeight: 55,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: '24px', 
    fontWeight: "400"
  },
  accountButton: {
    marginTop: "2px",
    fontSize: "32px"
  }
}));

export default function DeskTop() {
  const classes = useStyles();  
  const Router = useRouter();
  const [ user ] = useCurrentUser();
  const [ deskMenu, setDeskMenu ] = useContext(deskMenuContext);
  const [ deskAccount, setDeskAccount ] = useContext(deskAccountContext);
  const [ uploadDialog, setUploadDialog ] = useContext(uploadDialogContext);

  const handleMenu = () => {
    setDeskMenu(!deskMenu);
  };

  const handleAccount = () => {
    setDeskAccount(!deskAccount);
  }

  const handleUpload = () => {    
    setUploadDialog(!uploadDialog);
  }

  const handleBack = () => {
    Router.back();
  }
      
  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar} >
        <Toolbar style={{ minHeight: 55 }}>

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
            <Grid container spacing={3} alignItems="center">

                {location.pathname !== '/' &&
                  <IconButton onClick={handleBack} >
                    <ArrowBackIosIcon />
                  </IconButton>                
                }

                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open content menu"
                  onClick={handleMenu}
                  >
                <MenuIcon />
              </IconButton>

            <DarkTooltip title="Home">
                <Link href="/" >
                  <Typography className={classes.title} >
                    MediaSite
                  </Typography>
                </Link>
            </DarkTooltip>

            </Grid>          
          </Grid>  

          <Grid item xs={4}>
            <DeskSearch />
          </Grid>          

            <Grid item xs={4}>  
              <Grid container justifyContent="flex-end" alignItems="center"> 
                <>
                  { user ?  
                  <>
                    { user?.creator && (
                      <>
                        <DarkTooltip title="Upload Content">
                          <IconButton
                            color="inherit"
                            aria-label="upload content"
                            onClick={handleUpload}  
                          >
                            <AddIcon className={classes.accountButton} />
                          </IconButton>
                        </DarkTooltip>
                      </>
                    )}
                    
                    <DarkTooltip title="Account Menu">   
                      <IconButton
                        color="inherit"
                        aria-label="open account menu"
                        onClick={handleAccount}
                      >
                        <AccountCircleIcon className={classes.accountButton} />
                      </IconButton>
                    </DarkTooltip>
                  </>
                  : 
                  <LoginButtons />     
                }
                </>
              </Grid>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>   
      <DeskMenu />
      {user && <DeskAccount /> }
    </>
  );
}