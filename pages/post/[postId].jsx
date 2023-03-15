import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { parse } from 'next-useragent';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import DeskPost from "@/components/post/desk-post/DeskPost";
import MobilePost from "@/components/post/mobile-post/MobilePost";

import { useCurrentUser } from '@/lib/user/hooks';
import { findPostById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { formatOG } from '@/lib/post';


export default function Post({ post, uaString }) {
  const theme = useTheme();
  const [ user ] = useCurrentUser();
  const router = useRouter();
  let width = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  }

  useEffect(() => {
    if(user?.subscribed){
      Router.push(`/post/members/${router.query.postId}`);
    }
    if(new Date(post.publishDate) > new Date()) {
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
      
      {!user && desk &&
        <DeskPost post={post} desk={desk} />
      }

      {!user && !desk && 
        <MobilePost post={post} desk={desk} />
      }
      </>
  );
};

export async function getServerSideProps(context) {
  const db = await getMongoDb();  
  const post = await findPostById(db, context.params.postId, false);
  const ogDesc = await formatOG(post);

  if(!post) {
    return {
      notFound: true,
    };
  }
  
  return { props: {
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

