import * as React from 'react';
import { chakra } from '@chakra-ui/system';

const customTheme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

customTheme.breakpoints.base = customTheme.breakpoints[0];
customTheme.breakpoints.sm = customTheme.breakpoints[1];
customTheme.breakpoints.lg = customTheme.breakpoints[2];

export default function BoxChakraUi() {
  return (
    <div>
      {new Array(1000).fill().map(() => (
        <chakra.div
          theme={customTheme}
          width={200}
          height={200}
          borderWidth="3px"
          borderColor="white"
          backgroundColor={['primary', 'text', 'background']}
          borderStyle={['dashed', 'solid', 'dotted']}
          _hover={{
            backgroundColor: 'text',
          }}
        >
          test case
        </chakra.div>
      ))}
    </div>
  );
}
