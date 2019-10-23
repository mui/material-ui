import { assert } from 'chai';
import borders from './borders';

describe('borders', () => {
  it('should be able to specify size', () => {
    const borderProps = borders({
      theme: {},
      border: 1,
    });
    assert.deepEqual(borderProps, {
      border: '1px solid',
    });
  });

  it('should be able to specify size from the theme', () => {
    const borderProps = borders({
      theme: {
        borders: {
          small: 2,
        },
      },
      border: 'small',
    });
    assert.deepEqual(borderProps, {
      border: '2px solid',
    });
  });

  it('should be able to customize the border style', () => {
    const borderProps = borders({
      theme: {},
      border: '1 dotted',
    });
    assert.deepEqual(borderProps, {
      border: '1px dotted',
    });
  });

  it('should be able to customize the border color', () => {
    const borderProps = borders({
      theme: {
        palette: {
          testColor: 'green',
        },
      },
      border: '1 solid testColor',
    });
    assert.deepEqual(borderProps, {
      border: '1px solid green',
    });
  });
});
