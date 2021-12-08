import { expect } from 'chai';
import {
  refactorMarkdownContent,
  getNewDataLocation,
  getNewPageLocation,
} from './restructureUtils';

describe('restructure utils', () => {
  describe('refactorMarkdownContent', () => {
    it('replace demo to relative path', () => {
      expect(
        refactorMarkdownContent(
          `{{"demo": "pages/components/accordion/BasicAccordion.js", "bg": true}}`,
        ),
      ).to.equal(`{{"demo": "BasicAccordion.js", "bg": true}}`);
    });

    it('add material prefix to related links', () => {
      expect(
        refactorMarkdownContent(
          `You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).`,
          ['/customization'],
        ),
      ).to.equal(
        `You can learn more about this in the [overrides documentation page](/material/customization/how-to-customize/).`,
      );

      expect(
        refactorMarkdownContent(
          `You can learn more about this in the [overrides documentation page](/guides/how-to-customize/).`,
          ['/guides'],
        ),
      ).to.equal(
        `You can learn more about this in the [overrides documentation page](/material/guides/how-to-customize/).`,
      );
    });

    it('does not replace http: links', () => {
      const content = `> **Note:** Accordions are no longer documented in the [Material Design guidelines](https://material.io/), but MUI will continue to support them. It was formerly known as the "expansion panel".`;
      expect(refactorMarkdownContent(content)).to.equal(content);
    });

    it('does not prefix system | styles links', () => {
      const content = `It's similar to the \`row-gap\` and \`column-gap\` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap). When using MUI's theme with the [styling solution](/styles/basics/)`;
      expect(
        refactorMarkdownContent(content, [
          '/getting-started',
          '/components',
          '/api-docs',
          '/customization',
          '/guides',
          '/discover-more',
        ]),
      ).to.equal(content);
    });
  });

  it('getNewDataLocation', () => {
    expect(
      getNewDataLocation('material-ui/docs/src/pages/getting-started/installation/installation.md'),
    ).to.deep.equal({
      directory: 'material-ui/docs/products/material/getting-started/installation',
      path: 'material-ui/docs/products/material/getting-started/installation/installation.md',
    });
  });

  it('getNewPageLocation', () => {
    expect(
      getNewPageLocation('material-ui/docs/pages/getting-started/installation.js'),
    ).to.deep.equal({
      directory: 'material-ui/docs/pages/material/getting-started',
      path: 'material-ui/docs/pages/material/getting-started/installation.js',
    });
  });
});
