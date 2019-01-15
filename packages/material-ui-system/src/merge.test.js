import { assert } from 'chai';
import merge from './merge';

describe('merge', () => {
  it('should merge deep', () => {
    const output = merge(
      {
        display: 'flex',
        '@media (min-width:600px)': {
          padding: 8,
        },
      },
      {
        position: 'relative',
        '@media (min-width:600px)': {
          margin: 16,
        },
      },
    );
    assert.deepEqual(output, {
      '@media (min-width:600px)': {
        margin: 16,
        padding: 8,
      },
      display: 'flex',
      position: 'relative',
    });
  });

  it('should merge repetitive styles', () => {
    const output = merge(
      {
        '@media (min-width:600px)': {
          padding: 8,
        },
      },
      {
        '@media (min-width:600px)': {
          padding: 8,
        },
      },
    );
    assert.deepEqual(output, {
      '@media (min-width:600px)': {
        padding: 8,
      },
    });
  });
});
