import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { parse } from 'next-useragent';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import DeskPost from '@/components/post/desk-post/DeskPost';
import MobilePost from '@/components/post/mobile-post/MobilePost';
import EditDialog from '@/components/post/edit-post/EditDialog';

import { useCurrentUser } from '@/lib/user/hooks';
import { getMongoDb } from '@/api-lib/mongodb';
import { findPostById } from '@/api-lib/db';
import { formatOG } from '@/lib/post';

export default function Post({ post, uaString }) {
  const theme = useTheme();
  const [ user ] = useCurrentUser();
  const router = useRouter();
  let width = {
    xs: useMediaQuery(theme.breakpoints.up('xs')),
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  }
  
  useEffect(() => {
    if(!user?.subscribed){
      Router.push(`/post/${router.query.postId}`);
    }
    if(!(user?.creator || new Date(post.publishDate) < new Date()) || !post) {
      Router.push(`/404`);
    }
  }, [user]);

  let ua;
  if (uaString) {
    ua = parse(uaString);
  } else {
    ua = parse(window.navigator.userAgent);
  }  
  let desk = width.md;

  return (
    <>
      <Head>
        <title>{post.title.replaceAll('_', ' ')}</title>
      </Head>
      {user?.creator &&
        <EditDialog />
      }

      {desk &&
        <DeskPost post={post} desk={desk} />
      }

      {!desk && 
        <MobilePost post={post} desk={desk} />
      }
      </>
  );
};

export async function getServerSideProps(context) {
  const forwarded = context.req.headers["x-forwarded-for"]
  let ip = forwarded ? forwarded.split(/, /)[0] : context.req.connection.remoteAddress;
  if(ip == '::1') ip = '76.169.76.173';

  const db = await getMongoDb();
  const post = await findPostById(db, context.params.postId, true, ip);
  const ogDesc = await formatOG(post);

  if(!post) {
    return {
      notFound: true,
    };
  }

  return { props: {
    ip,
    post,
    uaString: context.req.headers['user-agent'],
    openGraphData: [
      {
        property: "og:image",
        content:
          post?.videoThumbnail,
        key: "ogimage",
      },
      {
        property: "og:url",
        content: `${process.env.WEB_URI}post/${post.id}`,
        key: "ogurl",
      },
      {
        property: "og:image:secure_url",
        content:
        post?.videoThumbnail,
        key: "ogimagesecureurl",
      },
      {
        property: "og:title",
        content: post.title.replaceAll('_', ' '),
        key: "ogtitle",
      },
      {
        property: "og:description",
        content: ogDesc,
        key: "ogdesc",
      },
      {
        property: "og:type",
        content: "MediaSite",
        key: "website",
      },
    ],
  }};
}

