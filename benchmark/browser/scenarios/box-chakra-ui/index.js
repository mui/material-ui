import * as React from 'react';
import { chakra } from '@chakra-ui/system';

const customTheme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

export default function BoxChakraUi() {
  return (
    <div>
      {new Array(1000).fill().map(() => (
        <chakra.div
          width={200}
          height={200}
          theme={customTheme}
          color={'primary'}
          backgroundColor={['primary', 'text', 'background']}
          borderWidth={'3px'}
          borderColor={'white'}
          borderStyle={['dashed', 'solid', 'dotted']}
        >
          test case
        </chakra.div>
      ))}
    </div>
  );
}
