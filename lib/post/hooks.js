import useSWRInfinite from 'swr/infinite';

import { fetcher } from '@/lib/fetch';

export function usePostPages({ limit=12, keywords, type='all', not, sort, code } = {}) {

  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      const searchParams = new URLSearchParams();

      searchParams.set('limit', limit);

      if (keywords) searchParams.set('keywords', keywords);

      if (type) searchParams.set('type', type);

      if (not) searchParams.set('not', not);

      if (sort) searchParams.set('sort', sort);

      if(code) searchParams.set('code', code);

      searchParams.set('index', index);

      if (index !== 0) {
        // using oldest posts publish_date date as cursor
        // We want to fetch posts which has a date that is
        // before (hence the .getTime() - 1) the last post's publish_date
        if(sort == 'new'){
          let from = new Date(
            new Date(
              previousPageData.posts[previousPageData.posts.length - 1].publishDate
            ).getTime() - 1
          );
          searchParams.set('from', from.toJSON());
        } else if(sort == 'old'){
          let from = new Date(
            new Date(
              previousPageData.posts[previousPageData.posts.length - 1].publishDate
              ).getTime() + 1
              );
              searchParams.set('from', from.toJSON());
        }
      }
        return `/api/post?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.posts?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
