import PropTypesDoc from '../../prop-types.json';

export const navItems = [
  {
    title: 'Getting Started',
    children: [
      { title: 'Installation', href: '/getting-started/installation' },
      { title: 'Usage', href: '/getting-started/usage' },
      { title: 'Parsing dates', href: '/getting-started/parsing' },
    ],
  },
  {
    title: 'Localization',
    children: [
      { title: 'Using date-fns', href: '/localization/date-fns' },
      { title: 'Using moment', href: '/localization/moment' },
      { title: 'Additional Calendar Systems', href: '/localization/calendar-systems' },
    ],
  },
  {
    title: 'Components Demo',
    children: [
      { title: 'Date Picker', href: '/demo/datepicker' },
      { title: 'Time Picker', href: '/demo/timepicker' },
      { title: 'Date & Time Picker', href: '/demo/datetime-picker' },
    ],
  },
  {
    title: 'Components API',
    children: Object.keys(PropTypesDoc)
      .filter(component => !['ModalWrapper'].includes(component))
      .map(component => ({
        title: component,
        as: `/api/${component}`,
        href: `/api/props?component=${component}`,
      })),
  },
  {
    title: 'Guides',
    children: [
      { title: 'Form integration', href: '/guides/form-integration' },
      { title: 'CSS overrides', href: '/guides/css-overrides' },
      { title: 'Global format customization', href: '/guides/formats' },
      {
        title: 'Open pickers programmatically',
        href: '/guides/controlling-programmatically',
      },
      { title: 'Static inner components', href: '/guides/static-components' },
      { title: 'Updating to v3', href: '/guides/upgrading-to-v3' },
    ],
  },
] as const;
