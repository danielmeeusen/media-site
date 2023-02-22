import React, { useContext } from 'react';

import { getMongoDb } from '@/api-lib/mongodb';
// import { getRandomTagsFromPosts } from '@/api-lib/db';
import { sortContext } from '@/lib/AppContext';
import Posts from '@/components/post/Posts';

export default function Index({ tags }) {
  const [ sort, setSort ] = useContext(sortContext);

  const query = {
    type: 'all',
    keywords: tags,
  };

  return (  
    <div style={{ margin: "0px 9px 0px 9px" }}>
      <Posts query={sort == 'blend' && query} />
    </div>   
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();
  // const tags = await getRandomTagsFromPosts(db, 20);

  return { props: {
    tags: {},
    openGraphData: [
      {
        property: "og:image",
        content: '',
        key: "ogimage",
      },
      {
        property: "og:url",
        content: '',
        key: "ogurl",
      },
      {
        property: "og:image:secure_url",
        content: '',
        key: "ogimagesecureurl",
      },
      {
        property: "og:title",
        content: 'MediaSite',
        key: "ogtitle",
      },
      {
        property: "og:description",
        content: "Demonstration Media Site",
        key: "ogdesc",
      },
      {
        property: "og:type",
        content: "MediaSite",
        key: "website",
      },
    ],
  }}
}