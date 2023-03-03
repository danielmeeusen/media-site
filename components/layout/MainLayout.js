import React, { useContext } from 'react';
import Router from 'next/router';
import { parse } from 'next-useragent';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { loadingContext } from '@/lib/AppContext';
import { useSessions } from '@/lib/user/hooks';
import { useCurrentUser } from '@/lib/user/hooks';

import { MobileLayout, DeskLayout } from '@/components/layout'
import { InstallPWA, DeviceDialog, Loading } from '@/components/shared';
import LoginDialog from '@/components/navigation/login/LoginDialog';
import UploadDialog from '@/components/post/edit-post/UploadDialog';

export default function MainLayout({ children, ip, uaString }) {
  const theme = useTheme();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ sessions ] = useSessions();
  const [ user, { mutate } ] = useCurrentUser();
  let width = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  }
 
  let displayMode = navigator.standalone || window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser';

  let ua;
  if (uaString) {
    ua = parse(uaString);
  } else {
    ua = parse(window.navigator.userAgent);
  }  
  let desk = ua ? ua.isDesktop : width.md;
  
  return (
    <>
      <InstallPWA ua={ua} displayMode={displayMode} />
      <Loading open={loading} />
      {!user && <LoginDialog ua={ua} displayMode={displayMode} ip={ip} /> }
      <UploadDialog />
      { sessions?.length > 7 && Router.pathname !== '/recover-password' ?
        <DeviceDialog />
        :
        <>
          { !desk && 
            <MobileLayout>
            { children }
            </MobileLayout>
          }
          { desk &&
            <DeskLayout pwa={ displayMode == 'standalone' }>
              { children }
            </DeskLayout>
          }
        </>
      }
    </>
    ) 
  }

  export async function getServerSideProps(ctx) {  
    return {
      props: {
        ...props,
        uaString: ctx.req.headers['user-agent'],
      },
    };
  }