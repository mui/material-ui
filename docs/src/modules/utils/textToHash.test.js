import { assert, expect } from 'chai';
import { render as renderMarkdown } from './parseMarkdown';
import textToHash from './textToHash';

describe('textToHash', () => {
  it('should hash as expected', () => {
    const table = [
      ['createMuiTheme(options) => theme', 'createmuitheme-options-theme'],
      ['Typography - Font family', 'typography-font-family'],
      ["barre d'application", 'barre-dapplication'],
      [
        'createGenerateClassName([options]) => class name generator',
        'creategenerateclassname-options-class-name-generator',
      ],
      [
        '@material-ui/core/styles vs @material-ui/styles',
        'material-ui-core-styles-vs-material-ui-styles',
      ],
    ];
    table.forEach((entry, index) => {
      const [markdown, expected] = entry;
      const text = renderMarkdown(markdown);
      const actual = textToHash(text);

      expect(actual).to.equal(expected, `snapshot #${index} matches`);
    });
  });

  it('should generate a unique hash', () => {
    const unique = {};
    assert.strictEqual(textToHash('Styling solution', unique), 'styling-solution');
    assert.strictEqual(textToHash('Styling solution', unique), 'styling-solution-2');
  });
});
