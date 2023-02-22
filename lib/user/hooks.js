import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [ user, { mutate } ];
}

export function useUser(id) {
  const { data } = useSWR(`/api/user/${id}`, fetcher);
  return data?.user;
}

export function useSessions() {
  const { data, mutate } = useSWR('/api/user/sessions', fetcher);
  const sessions = data?.sessions;
  return [ sessions, { mutate } ];
}