import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

export function useSite() {
  const { data } = useSWR('/api/site', fetcher);
  const site = data?.site;
  return [ site ];
}