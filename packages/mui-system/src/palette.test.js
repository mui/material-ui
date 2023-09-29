import { expect } from 'chai';
import palette from './palette';

const theme = {
  palette: {
    grey: { 100: '#f5f5f5' },
  },
};

describe('palette', () => {
  it('should treat grey as CSS color', () => {
    let output;
    expect(() => {
      output = palette({
        theme,
        backgroundColor: 'grey',
      });
    }).toWarnDev(
      'MUI: The value found in theme for prop: "grey" is an [Object] instead of string or number. Check if you forgot to add the correct dotted notation, eg, "background.paper" instead of "background".',
    );

    expect(output).to.deep.equal({
      backgroundColor: 'grey',
    });
  });

  it('should treat grey.100 as theme color', () => {
    const output = palette({
      theme,
      backgroundColor: 'grey.100',
    });
    expect(output).to.deep.equal({
      backgroundColor: '#f5f5f5',
    });
  });
});
