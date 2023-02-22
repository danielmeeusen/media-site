import MainLayout from '@/components/layout/MainLayout';
import { useCurrentUser } from '@/lib/user/hooks';

export default function ClientLayout({ children }) {
  let [ user ] = useCurrentUser();

  return user !== undefined && <MainLayout>{children}</MainLayout>;
}