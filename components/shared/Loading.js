import Image from 'next/image'; 

import { Modal, Box } from '@material-ui/core';

export default function Loading(props) {
  const { open } = props;
  
  return (    
    <Modal
      open={open}
      aria-labelledby="loading..."
      aria-describedby="loading..."
      >
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%" >
          <Box mt={-30}>
            <Image src="/image/BeanEater.png" alt="loading..." width="100" height="100" /> 
          </Box>
      </Box>
    </Modal> 
  );
}