import { assert } from 'chai';
import borders from './borders';

describe('borders', () => {
  it('should be able to customize the border size and style', () => {
    const borderProps = borders({
      theme: {},
      border: 1,
      borderTop: 2,
      borderRight: 3,
      borderBottom: 4,
      borderLeft: 5,
    });
    assert.deepEqual(borderProps, {
      border: '1px solid',
      borderTop: '2px solid',
      borderRight: '3px solid',
      borderBottom: '4px solid',
      borderLeft: '5px solid',
    });
  });

  it('should be able to customize the border color', () => {
    const borderProps = borders({
      theme: {
        palette: {
          testColor: {
            myBorderColor: 'myBorderColor',
            mBorderTopColor: 'mBorderTopColor',
            myBorderRightColor: 'myBorderRightColor',
            myBorderBottomColor: 'myBorderBottomColor',
            myBorderLeftColor: 'myBorderLeftColor',
          },
        },
      },
      borderColor: 'testColor.myBorderColor',
      borderTopColor: 'testColor.mBorderTopColor',
      borderRightColor: 'testColor.myBorderRightColor',
      borderBottomColor: 'testColor.myBorderBottomColor',
      borderLeftColor: 'testColor.myBorderLeftColor',
    });
    assert.deepEqual(borderProps, {
      borderColor: 'myBorderColor',
      borderTopColor: 'mBorderTopColor',
      borderRightColor: 'myBorderRightColor',
      borderBottomColor: 'myBorderBottomColor',
      borderLeftColor: 'myBorderLeftColor',
    });
  });
});
