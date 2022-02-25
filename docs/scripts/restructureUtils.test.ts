import { expect } from 'chai';
import { markdown, getNewDataLocation, getNewPageLocation } from './restructureUtils';

describe('restructure utils', () => {
  describe('refactorMarkdownContent', () => {
    it('updateMaterialTitle correctly', () => {
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/accordion.md',
          'title: React Accordion component',
        ),
      ).to.equal('title: React Accordion');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/alert.md',
          'title: React Alert component',
        ),
      ).to.equal('title: React Alert');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/app-bar.md',
          'title: App Bar React component',
        ),
      ).to.equal('title: React App Bar');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/autocomplete.md',
          'title: React Autocomplete component',
        ),
      ).to.equal('title: React Autocomplete');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/avatars.md',
          'title: React Avatar component',
        ),
      ).to.equal('title: React Avatar');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/backdrop.md',
          'title: Backdrop React Component',
        ),
      ).to.equal('title: React Backdrop');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/badges.md',
          'title: React Badge component',
        ),
      ).to.equal('title: React Badge');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/bottom-navigation.md',
          'title: Bottom Navigation React component',
        ),
      ).to.equal('title: React Bottom Navigation');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/box.md',
          'title: React Box component',
        ),
      ).to.equal('title: React Box');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/breadcrumbs.md',
          'title: React Breadcrumbs',
        ),
      ).to.equal('title: React Breadcrumbs');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/buttons.md',
          'title: React Button component',
        ),
      ).to.equal('title: React Button');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/cards.md',
          'title: React Card component',
        ),
      ).to.equal('title: React Card');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/checkboxes.md',
          'title: React Checkbox component',
        ),
      ).to.equal('title: React Checkbox');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/chips.md',
          'title: React Chip component',
        ),
      ).to.equal('title: React Chip');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/click-away-listener.md',
          'title: Detect click outside React component',
        ),
      ).to.equal('title: React Click Away Listener');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/dialogs.md',
          'title: React Dialog component',
        ),
      ).to.equal('title: React Dialog');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/dividers.md',
          'title: React Divider component',
        ),
      ).to.equal('title: React Divider');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/drawers.md',
          'title: React Drawer component',
        ),
      ).to.equal('title: React Drawer');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/icons.md',
          'title: React Icon component',
        ),
      ).to.equal('title: React Icon');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/links.md',
          'title: Link',
        ),
      ).to.equal('title: React Link');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/lists.md',
          'title: React List component',
        ),
      ).to.equal('title: React List');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/material-icons.md',
          'title: Material icons',
        ),
      ).to.equal('title: Material Icons');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/menus.md',
          'title: React Menu component',
        ),
      ).to.equal('title: React Menu');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/pickers.md',
          'title: Date picker, Time picker React components',
        ),
      ).to.equal('title: React Date,Time Pickers');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/progress.md',
          'title: Circular, Linear progress React components',
        ),
      ).to.equal('title: React Circular,Linear Progress');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/radio-buttons.md',
          'title: Radio buttons React component',
        ),
      ).to.equal('title: React Radio Button');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/selects.md',
          'title: React Select component',
        ),
      ).to.equal('title: React Select');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/snackbars.md',
          'title: React Snackbar component',
        ),
      ).to.equal('title: React Snackbar');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/steppers.md',
          'title: React Stepper component',
        ),
      ).to.equal('title: React Stepper');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/switches.md',
          'title: React Switch component',
        ),
      ).to.equal('title: React Switch');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/tables.md',
          'title: React Table component',
        ),
      ).to.equal('title: React Table');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/tabs.md',
          'title: React Tabs component',
        ),
      ).to.equal('title: React Tabs');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/text-fields.md',
          'title: Text Field React component',
        ),
      ).to.equal('title: React Text Field');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/tooltips.md',
          'title: React Tooltip component',
        ),
      ).to.equal('title: React Tooltip');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/transitions.md',
          'title: React Transition component',
        ),
      ).to.equal('title: React Transition');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/trap-focus.md',
          'title: Trap Focus React component',
        ),
      ).to.equal('title: React Trap Focus');
      expect(
        markdown.updateMaterialTitle(
          '/material-ui/docs/data/material/components/use-media-query.md',
          'title: Media queries in React for responsive design',
        ),
      ).to.equal('title: useMediaQuery React Hook');
    });

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
      path: 'material-ui/docs/pages/material/react-button.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/image-list.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-image-list.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/no-ssr.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-no-ssr.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/masonry.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-masonry.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/trap-focus.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-trap-focus.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/css-baseline.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/react-css-baseline.js',
    });

    expect(getNewPageLocation('material-ui/docs/pages/components/about-the-lab.js')).to.deep.equal({
      directory: 'material-ui/docs/pages/material',
      path: 'material-ui/docs/pages/material/about-the-lab.js',
    });
  });
});
