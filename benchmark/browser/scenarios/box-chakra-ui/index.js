import * as React from 'react';
import { Box, extendTheme, ChakraProvider } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
});

export default function BoxChakraUi() {
  return (
    <ChakraProvider theme={customTheme}>
      {new Array(1000).fill().map(() => (
        <Box
          width={200}
          height={200}
          color={'primary'}
          backgroundColor={['primary', 'text', 'background']}
          borderWidth={'3px'}
          borderColor={'white'}
          borderStyle={['dashed', 'solid', 'dotted']}
        >
          test case
        </Box>
      ))}
    </ChakraProvider>
  );
}
