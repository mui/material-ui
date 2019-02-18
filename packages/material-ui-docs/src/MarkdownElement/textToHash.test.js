import { assert } from 'chai';
import textToHash from './textToHash';

describe('textToHash', () => {
  it('should hash correctly', () => {
    assert.strictEqual(
      textToHash('createMuiTheme(options) => theme'),
      'createmuithemeoptions-theme',
    );
    assert.strictEqual(textToHash('Typography - Font family'), 'typography-font-family');
  });
});
