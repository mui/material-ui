import { expect } from 'chai';
import findActivePage from './findActivePage';

describe('findActivePage', () => {
  describe('old structure', () => {
    const pages = [
      {
        pathname: '/getting-started',
        icon: 'DescriptionIcon',
        children: [{ pathname: '/getting-started/installation' }],
      },
      {
        pathname: '/components',
        icon: 'ToggleOnIcon',
        children: [
          {
            pathname: '/components',
            subheader: '/components/inputs',
            children: [
              { pathname: '/components/autocomplete' },
              { pathname: '/components/buttons', title: 'Button' },
              { pathname: '/components/button-group' },
              { pathname: '/components/checkboxes', title: 'Checkbox' },
              { pathname: '/components/floating-action-button' },
              { pathname: '/components/radio-buttons', title: 'Radio button' },
              { pathname: '/components/rating' },
              { pathname: '/components/selects', title: 'Select' },
              { pathname: '/components/slider' },
              { pathname: '/components/switches', title: 'Switch' },
              { pathname: '/components/text-fields', title: 'Text field' },
              { pathname: '/components/transfer-list' },
              { pathname: '/components/toggle-button' },
            ],
          },
        ],
      },
    ];
    it('return first level page', () => {
      expect(findActivePage(pages, '/getting-started')).to.deep.equal({
        pathname: '/getting-started',
        icon: 'DescriptionIcon',
        children: [{ pathname: '/getting-started/installation' }],
      });
    });

    it('return nested page', () => {
      expect(findActivePage(pages, '/getting-started/installation')).to.deep.equal({
        pathname: '/getting-started/installation',
      });
    });

    it('return deep nested page', () => {
      expect(findActivePage(pages, '/components/radio-buttons')).to.deep.equal({
        pathname: '/components/radio-buttons',
        title: 'Radio button',
      });
    });
  });

  describe('new structure', () => {
    const pages = [
      {
        pathname: '/material/components',
        icon: 'ToggleOnIcon',
        children: [
          {
            pathname: '/material/components',
            subheader: '/components/inputs',
            children: [
              { pathname: '/material/react-autocomplete' },
              { pathname: '/material/react-buttons', title: 'Button' },
              { pathname: '/material/react-button-group' },
              { pathname: '/material/react-checkboxes', title: 'Checkbox' },
              { pathname: '/material/react-floating-action-button' },
              { pathname: '/material/react-radio-buttons', title: 'Radio button' },
              { pathname: '/material/react-rating' },
              { pathname: '/material/react-selects', title: 'Select' },
              { pathname: '/material/react-slider' },
              { pathname: '/material/react-switches', title: 'Switch' },
              { pathname: '/material/react-text-fields', title: 'Text field' },
              { pathname: '/material/react-transfer-list' },
              { pathname: '/material/react-toggle-button' },
            ],
          },
        ],
      },
    ];

    it('return deep nested page', () => {
      expect(findActivePage(pages, '/material/react-radio-buttons')).to.deep.equal({
        pathname: '/material/react-radio-buttons',
        title: 'Radio button',
      });
    });
  });
});
