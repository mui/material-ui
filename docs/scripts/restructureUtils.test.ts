import { expect } from 'chai';
import { markdown, getNewDataLocation, getNewPageLocation } from './restructureUtils';

describe('restructure utils', () => {
  describe('refactorMarkdownContent', () => {
    it('replace demo to relative path', () => {
      expect(
        markdown.removeDemoRelativePath(
          `{{"demo": "pages/components/accordion/BasicAccordion.js", "bg": true}}`,
        ),
      ).to.equal(`{{"demo": "BasicAccordion.js", "bg": true}}`);

      expect(
        markdown.removeDemoRelativePath(
          `{{"demo": "pages/system/grid/GridTemplateColumns.js", "bg": true}}`,
        ),
      ).to.equal(`{{"demo": "GridTemplateColumns.js", "bg": true}}`);
    });

    it('add material prefix to related links', () => {
      expect(
        markdown.addMaterialPrefixToLinks(
          `You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).`,
        ),
      ).to.equal(
        `You can learn more about this in the [overrides documentation page](/material/customization/how-to-customize/).`,
      );

      expect(
        markdown.addMaterialPrefixToLinks(
          `You can learn more about this in the [overrides documentation page](/guides/how-to-customize/).`,
        ),
      ).to.equal(
        `You can learn more about this in the [overrides documentation page](/material/guides/how-to-customize/).`,
      );
    });

    it('add product: material to frontmatter', () => {
      expect(
        markdown.addProductFrontmatter(
          `
---
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---`,
          'material',
        ),
      ).to.equal(`
---
product: material
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---`);
    });

    it('does not replace http: links', () => {
      const content = `> **Note:** Accordions are no longer documented in the [Material Design guidelines](https://material.io/), but MUI will continue to support them. It was formerly known as the "expansion panel".`;
      expect(markdown.addMaterialPrefixToLinks(content)).to.equal(content);
    });

    it('does not prefix system | styles links', () => {
      const content = `It's similar to the \`row-gap\` and \`column-gap\` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap). When using MUI's theme with the [styling solution](/styles/basics/)`;
      expect(markdown.addMaterialPrefixToLinks(content)).to.equal(content);
    });
  });

  it('getNewDataLocation', () => {
    expect(
      getNewDataLocation(
        'material-ui/docs/src/pages/getting-started/installation/installation.md',
        'material',
      ),
    ).to.deep.equal({
      directory: 'material-ui/docs/data/material/getting-started/installation',
      path: 'material-ui/docs/data/material/getting-started/installation/installation.md',
    });

    expect(
      getNewDataLocation('material-ui/docs/src/pages/system/advanced/advanced.md', 'system'),
    ).to.deep.equal({
      directory: 'material-ui/docs/data/system/advanced',
      path: 'material-ui/docs/data/system/advanced/advanced.md',
    });
  });

  it('getNewPageLocation', () => {
    expect(
      getNewPageLocation('material-ui/docs/pages/getting-started/installation.js'),
    ).to.deep.equal({
      directory: 'material-ui/docs/pages/material/getting-started',
      path: 'material-ui/docs/pages/material/getting-started/installation.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/buttons.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-buttons.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/about-the-lab.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/about-the-lab.js',
    });
  });
});
