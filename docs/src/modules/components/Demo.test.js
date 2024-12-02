import * as React from 'react';
import Demo from './Demo';

const { expect } = require('chai');
const { createRenderer } = require('@mui/internal-test-utils');

describe('Function execution time test', () => {
  const { render } = createRenderer();
  let str = '';
  for (let i = 0; i < 1000000; i += 1) {
    str += '.';
  }
  str += '\n@.ts';

  it('should complete within 10 seconds', () => {
    const start = Date.now();
    try {
      expect(() => {
        render(
          <Demo
            mode={''}
            demo={''}
            disableAd={''}
            demoOptions={{
              hideToolbar: 'a',
              demo: str,
              defaultCodeOpen: false,
              disableAd: false,
            }}
            githubLocation={''}
          />,
        );
      }).toErrorDev('Any errors do not affect a DoS attack; only time is crucial.');
    } catch (error) {
      // Ignore the error
      console.log('');
    }
    const end = Date.now();
    const duration = (end - start) / 1000; // turn to seconds
    expect(duration).to.be.lessThan(10);
  });
});
