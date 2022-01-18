import Image from 'next/image';
import { Box } from '@material-ui/core/';

export default function Custom404() {
  return (
  <Box mt={15}>
  <Image src="/image/tommyboy-whatyoudo.gif" alt="What'd you do?!?" width="498" height="280" />
  <h1>404 - Page Not Found</h1>
  </Box>
  )
}