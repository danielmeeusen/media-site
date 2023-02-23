import { Box } from '@material-ui/core';

import { MobileTop, MobileBottom, MobileMenu, MobileSearch, MobileAccount} from '@/components/navigation/mobile-nav';
import { useCurrentUser } from '@/lib/user/hooks';

export default function MobileLayout({ children }) {
  const [ user ] = useCurrentUser();

  return (
    <>
      <MobileTop />
      <MobileMenu />
      <MobileSearch />
      { user && <MobileAccount /> }
      <Box mb={10} sx={{ padding: 0 }}> 
        { children }
      </Box>
      <MobileBottom />
    </>
    ) 
}
