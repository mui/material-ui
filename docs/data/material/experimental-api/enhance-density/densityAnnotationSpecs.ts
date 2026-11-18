import type { Claim } from './densityAnnotations';

const HEIGHT_BY_SIZE: Record<string, string> = {
  small: 'touchTarget - xxSmall',
  medium: 'touchTarget',
  large: 'touchTarget + small',
};

export const DENSITY_ANNOTATIONS: Record<
  string,
  (values: Record<string, string | boolean>) => Claim[]
> = {
  Accordion: () => [
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'touch-target',
      token: 'touchTarget',
      label: 'Summary',
      route: { gutter: 'right' },
    },
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'xSmall',
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-content',
      aspect: 'gap',
      token: 'xSmall',
      label: 'Summary content',
    },
    {
      on: '.MuiAccordionSummary-content',
      aspect: 'margin',
      axis: 'block',
      token: 'xxSmall',
      label: 'Summary content',
      route: { gutter: 'left' },
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Details',
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      side: 'top',
      token: 'xxSmall',
      label: 'Details',
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      side: 'bottom',
      token: 'small',
      label: 'Details',
    },
  ],
  Alert: () => [
    { on: '.MuiAlert-root', aspect: 'padding', axis: 'inline', token: 'small', label: 'Alert' },
    {
      on: '.MuiAlert-root',
      aspect: 'padding',
      axis: 'block',
      token: 'xSmall',
      label: 'Alert',
      route: { gutter: 'left' },
    },
    { on: '.MuiAlert-root', aspect: 'gap', token: 'xSmall', label: 'Alert' },
    {
      on: '.MuiAlert-icon',
      aspect: 'icon',
      token: '1.1lh',
      label: 'Icon',
      route: { gutter: 'left', shift: -32, line: 'diagonal' },
    },
    {
      on: '.MuiAlert-icon',
      aspect: 'padding',
      axis: 'block',
      token: '(touchTarget - 1em) / 2',
      label: 'Icon',
      route: { gutter: 'bottom' },
    },
    {
      on: '.MuiAlert-message',
      aspect: 'padding',
      axis: 'block',
      token: '(touchTarget - 1lh) / 2',
      label: 'Message',
      route: { gutter: 'bottom', at: 0.85 },
    },
    {
      on: '.MuiAlert-action .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touchTarget',
      outlined: true,
      wrap: true,
      label: 'Close button',
    },
  ],
  Autocomplete: (values) => {
    const sample = '.MuiAutocomplete-option:nth-of-type(2)';
    const annotations: Claim[] = [
      {
        on: sample,
        aspect: 'touch-target',
        token: 'touchTarget',
        label: 'Option',
        route: { gutter: 'left' },
      },
      {
        on: sample,
        aspect: 'padding',
        axis: 'inline',
        token: 'xSmall',
        label: 'Option',
        route: { gutter: 'bottom' },
      },
      {
        on: sample,
        aspect: 'padding',
        axis: 'block',
        token: 'xxSmall',
        label: 'Option',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'touch-target',
        text: 'OutlinedInput',
        label: 'Input root',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'padding',
        axis: 'block',
        token: 'xSmall / 2',
        label: 'Input root',
        route: { gutter: 'top', shift: -140 },
      },
      {
        on: '.MuiAutocomplete-popupIndicator',
        aspect: 'touch-target',
        token: 'touchTarget - xxSmall',
        label: 'Popup indicator',
        route: { gutter: 'top' },
      },
    ];
    if (values.multiple === true) {
      annotations.push(
        {
          on: '.MuiAutocomplete-tag',
          aspect: 'touch-target',
          token: 'touchTarget - xSmall',
          text: 'Tag',
          label: 'Tag',
        },
        {
          on: '.MuiAutocomplete-inputRoot',
          aspect: 'gap',
          token: '2px',
          label: 'Tag',
          route: { gutter: 'top' },
        },
      );
    } else {
      annotations.push({
        on: '.MuiAutocomplete-input',
        aspect: 'touch-target',
        axis: 'block',
        token: 'touchTarget - xSmall',
        wrap: true,
        label: 'Input',
        route: { gutter: 'left' },
      });
    }
    return annotations;
  },
  Avatar: () => [
    { on: '.MuiAvatar-root', aspect: 'touch-target', token: 'touchTarget', label: 'Avatar' },
  ],
  Badge: (values) =>
    values.variant === 'dot'
      ? [
          {
            on: '.MuiBadge-badge',
            aspect: 'touch-target',
            token: 'small',
            label: 'Badge',
            outlined: true,
          },
        ]
      : [
          {
            on: '.MuiBadge-badge',
            aspect: 'padding',
            axis: 'block',
            token: 'xxSmall',
            label: 'Badge',
          },
          {
            on: '.MuiBadge-badge',
            aspect: 'padding',
            axis: 'inline',
            token: 'xSmall',
            label: 'Badge',
          },
        ],

  BottomNavigation: () => [
    {
      on: '.MuiBottomNavigation-root',
      aspect: 'touch-target',
      token: 'xxLarge',
      outlined: true,
      label: 'Bar',
      route: { gutter: 'left' },
    },
    {
      on: '.MuiBottomNavigationAction-root:nth-of-type(2)',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Action',
    },
    {
      on: '.MuiBottomNavigationAction-root:nth-of-type(2)',
      aspect: 'gap',
      token: 'xxSmall',
      label: 'Action',
      route: { gutter: 'right' },
    },
  ],
  Breadcrumbs: () => [
    {
      on: '.MuiBreadcrumbs-ol',
      aspect: 'gap',
      token: 'xSmall',
      label: 'Ol',
      route: { gutter: 'top', shift: -40 },
    },
    {
      on: '.MuiBreadcrumbs-ol',
      aspect: 'gap',
      after: 1,
      token: 'xSmall',
      label: 'Ol',
      route: { gutter: 'top', shift: 40 },
    },
    {
      on: '.MuiBreadcrumbs-ol li:first-child a',
      aspect: 'padding',
      axis: 'inline',
      token: 'xSmall',
      label: 'Crumb link',
      route: { gutter: 'bottom', shift: -40 },
    },
    {
      on: '.MuiBreadcrumbs-ol li:nth-child(3) a',
      aspect: 'padding',
      axis: 'inline',
      token: 'xSmall',
      label: 'Crumb link',
      route: { gutter: 'bottom', shift: 40 },
    },
  ],
  Button: (values) => {
    const height = HEIGHT_BY_SIZE[values.size as string];
    const inline = values.size as string;
    return [
      {
        on: '.MuiButton-root',
        aspect: 'touch-target',
        token: height,
        label: 'Root',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: inline,
        label: 'Root',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiButton-root',
        aspect: 'gap',
        token: 'xSmall',
        label: 'Root',
        route: { gutter: 'top' },
      },
      {
        on: '.MuiButton-startIcon',
        aspect: 'icon',
        token: '0.8lh',
        label: 'Start icon',
        route: { gutter: 'left', shift: 40, line: 'diagonal' },
      },
      {
        on: '.MuiIconButton-root',
        aspect: 'touch-target',
        token: height,
        outlined: true,
        label: 'Icon button',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiIconButton-root svg',
        aspect: 'icon',
        token: 'iconSize',
        label: 'Icon button',
        route: { gutter: 'top' },
      },
    ];
  },
  Card: () => [
    {
      on: '.MuiCardHeader-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      label: 'Header',
      route: { gutter: 'top', shift: 40, line: 'diagonal' },
    },
    { on: '.MuiCardHeader-root', aspect: 'gap', token: 'small', label: 'Header' },
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-xSmall',
      label: 'Header action',
    },
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'block',
      token: '-xxSmall',
      label: 'Header action',
    },
    {
      on: '.MuiCardContent-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      label: 'Content',
      route: { gutter: 'right', line: 'diagonal' },
    },
    {
      on: '.MuiCardActions-root',
      aspect: 'padding',
      side: 'bottom',
      token: 'medium',
      label: 'Actions',
    },
    {
      on: '.MuiCardActions-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Actions',
      route: { gutter: 'bottom', shift: -175 },
    },
    { on: '.MuiCardActions-root', aspect: 'gap', token: 'xSmall', label: 'Actions' },
  ],
  Checkbox: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'max(24px, touchTarget - xxSmall)' : 'touchTarget',
        wrap: small,
        label: 'Checkbox',
      },
      {
        on: '.MuiCheckbox-root',
        aspect: 'icon',
        token: small ? 'iconSize - xxSmall' : 'iconSize',
        label: 'Checkbox icon',
        route: { gutter: 'top' },
      },
    ];
  },
  Chip: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiChip-root',
        aspect: 'touch-target',
        token: small ? 'touchTarget - xxSmall' : 'touchTarget',
        label: 'Chip',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiChip-root',
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'xSmall' : 'small',
        label: 'Chip',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiChip-root',
        aspect: 'gap',
        token: small ? 'xxSmall' : 'xSmall',
        label: 'Chip',
        route: { gutter: 'top', shift: -40 },
      },
      {
        on: '.MuiChip-avatar',
        aspect: 'touch-target',
        token: small ? 'touchTarget - xxSmall - xSmall' : 'touchTarget - xSmall',
        label: 'Avatar',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiChip-deleteIcon',
        aspect: 'icon',
        token: small ? 'touchTarget - xxSmall - xSmall' : 'touchTarget - xSmall',
        label: 'Delete icon',
        route: { gutter: 'top', shift: 60 },
      },
    ];
  },
  Dialog: (values) => [
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      side: 'left',
      token: 'medium',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      side: 'right',
      token: 'small',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      axis: 'block',
      token: 'small',
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touchTarget',
      wrap: true,
      label: 'Close button',
    },
    {
      on: '.MuiDialogContent-root',
      aspect: 'padding',
      axis: values['DialogContent dividers'] === 'true' ? 'all' : 'inline',
      token: 'medium',
      wrap: true,
      label: 'Content',
      route: { gutter: 'left' },
    },
    {
      on: '.MuiDialogActions-root',
      aspect: 'padding',
      axis: 'all',
      token: 'medium',
      wrap: true,
      label: 'Actions',
      route: { gutter: 'left', line: 'diagonal' },
    },
    { on: '.MuiDialogActions-root', aspect: 'gap', token: 'small', label: 'Actions' },
  ],
  Fab: (values) => [
    {
      on: '.MuiFab-root',
      aspect: 'touch-target',
      token: {
        small: 'touchTarget + xxSmall',
        medium: 'touchTarget + xSmall',
        large: 'touchTarget + medium',
      }[values.size as string],
      label: 'Fab',
    },
  ],
  List: (values) => {
    const dense = values.dense === true;
    return [
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: '8px',
        label: 'List',
        route: { gutter: 'top', at: 0.85 },
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'touch-target',
        token: dense ? 'max(24px, touchTarget - xxSmall)' : 'touchTarget',
        wrap: dense,
        label: 'Item',
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'padding',
        axis: 'block',
        token: 'xxSmall',
        label: 'Item',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: dense ? 'xSmall' : 'small',
        label: 'Item',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiListItem-root:nth-of-type(2) .MuiListItemButton-root',
        aspect: 'gap',
        token: 'xSmall',
        label: 'Item',
        route: { gutter: 'top' },
      },
    ];
  },
  Menu: (values) => {
    const dense = values.dense === true;
    const inset = values.inset === true;
    const iconSlot = dense ? '0.8lh' : 'iconSize';
    return [
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: '8px',
        label: 'MenuList',
        route: { gutter: 'top', at: 0.85 },
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'touch-target',
        token: dense ? 'max(24px, touchTarget - xxSmall)' : 'max(28px, touchTarget)',
        wrap: true,
        label: 'Item',
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'block',
        token: 'xxSmall',
        label: 'Item',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'inline',
        token: 'xSmall',
        label: 'Item',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiMenuItem-root:nth-of-type(2)',
        aspect: 'gap',
        token: 'xSmall',
        label: 'Item',
        route: { gutter: 'top' },
      },
      ...(dense
        ? ([
            {
              on: '.MuiMenuItem-root:nth-of-type(1) .MuiListItemIcon-root svg',
              aspect: 'icon',
              token: '0.8lh',
              label: 'Item icon',
            },
          ] as Claim[])
        : []),
      ...(inset
        ? ([
            {
              on: '.MuiListItemText-inset',
              aspect: 'padding',
              side: 'left',
              token: `${iconSlot} + xSmall`,
              label: 'Inset text',
              route: { gutter: 'left' },
            },
            {
              on: '.MuiDivider-inset',
              aspect: 'margin',
              side: 'left',
              token: `${iconSlot} + 2 × xSmall`,
              wrap: true,
              label: 'Inset divider',
              route: { gutter: 'left', shift: -12 },
            },
          ] as Claim[])
        : []),
    ];
  },
  Pagination: (values) => {
    const box = HEIGHT_BY_SIZE[values.size as string];
    return [
      {
        on: '.MuiPaginationItem-page.Mui-selected',
        aspect: 'touch-target',
        token: box,
        label: 'Item',
        route: { gutter: 'left' },
      },
      { on: '.MuiPagination-ul', aspect: 'gap', token: 'xSmall', label: 'Ul' },
    ];
  },
  Progress: () => [
    {
      on: '.MuiLinearProgress-root',
      aspect: 'touch-target',
      token: '4px',
      label: 'Linear bar',
    },
    {
      on: '.MuiCircularProgress-root',
      aspect: 'touch-target',
      token: 'touchTarget',
      label: 'Circular',
    },
  ],
  Radio: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiRadio-root',
        aspect: 'touch-target',
        token: small ? 'max(24px, touchTarget - xxSmall)' : 'touchTarget',
        wrap: small,
        label: 'Radio',
      },
      {
        on: '.MuiRadio-root',
        aspect: 'icon',
        token: small ? 'iconSize - xxSmall' : 'iconSize',
        label: 'Radio icon',
        route: { gutter: 'top' },
      },
    ];
  },
  Select: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'touch-target',
        text: 'Outlined',
        label: 'Outlined',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiOutlinedInput-root .MuiInputAdornment-root svg',
        aspect: 'icon',
        token: 'iconSize',
        label: 'Outlined',
        route: { gutter: 'top' },
      },
      {
        on: '.MuiFilledInput-root',
        aspect: 'touch-target',
        text: 'Filled',
        label: 'Filled',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiInput-root',
        aspect: 'touch-target',
        text: 'Standard',
        label: 'Standard',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiInput-root .MuiInputBase-input',
        aspect: 'padding',
        axis: 'block',
        token: small ? '(touchTarget - xxSmall - 1lh) / 2' : '(touchTarget - 1lh) / 2',
        label: 'Select value',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiInput-root',
        aspect: 'gap',
        token: small ? 'xxSmall' : 'xSmall',
        label: 'Input root',
        route: { gutter: 'bottom' },
      },
    ];
  },
  Slider: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiSlider-root',
        aspect: 'touch-target',
        token: 'touchTarget',
        label: 'Root',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiSlider-thumb',
        aspect: 'touch-target',
        pointer: true,
        token: small ? 'small' : 'medium',
        label: 'Thumb',
        route: { gutter: 'top' },
      },
      {
        on: '.MuiSlider-rail',
        aspect: 'touch-target',
        token: small ? 'xSmall / 4' : 'small / 4',
        label: 'Rail',
        route: { gutter: 'right' },
      },
    ];
  },
  SnackbarContent: () => [
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Snackbar',
    },
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'block',
      token: '8px',
      label: 'Snackbar',
      route: { gutter: 'left' },
    },
    { on: '.MuiSnackbarContent-root', aspect: 'gap', token: 'small', label: 'Snackbar' },
    {
      on: '.MuiSnackbarContent-message',
      aspect: 'padding',
      axis: 'block',
      token: 'xSmall',
      label: 'Message',
      route: { gutter: 'bottom', at: 0.9 },
    },
    {
      on: '.MuiSnackbarContent-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-xSmall',
      label: 'Action',
      route: { gutter: 'right', line: 'diagonal' },
    },
  ],
  Stepper: (values) => {
    const vertical = values.orientation === 'vertical';
    return [
      {
        on: '.MuiStep-root:first-of-type .MuiStepLabel-iconContainer',
        aspect: 'touch-target',
        pointer: true,
        token: 'touchTarget',
        label: 'Icon container',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiStep-root:first-of-type .MuiStepIcon-root',
        aspect: 'icon',
        token: 'touchTarget - small + 2px',
        label: 'Step icon',
        route: vertical ? { gutter: 'top' } : { gutter: 'bottom' },
      },
      ...(vertical
        ? []
        : [
            {
              on: '.MuiStepper-root',
              aspect: 'gap' as const,
              label: 'Stepper',
              route: { gutter: 'top' as const, shift: -45 },
            },
            {
              on: '.MuiStep-root:nth-of-type(2)',
              aspect: 'gap' as const,
              label: 'Step',
              route: { gutter: 'top' as const, shift: 45 },
            },
          ]),
      ...(vertical
        ? [
            {
              on: '.MuiStep-root:nth-of-type(2) .MuiStepConnector-root',
              aspect: 'margin' as const,
              side: 'left' as const,
              token: 'touchTarget / 2',
              label: 'Connector',
              route: { gutter: 'left' as const },
            },
            {
              on: '.MuiStep-root:first-of-type .MuiStepContent-root',
              aspect: 'margin' as const,
              side: 'left' as const,
              token: 'touchTarget / 2',
              label: 'Content',
              route: { gutter: 'left' as const },
            },
            {
              on: '.MuiStep-root:first-of-type .MuiStepContent-root',
              aspect: 'padding' as const,
              side: 'left' as const,
              token: 'touchTarget / 2 - 1px',
              label: 'Content',
              route: { gutter: 'right' as const, at: 0.5 },
            },
            {
              on: '.MuiStep-root:nth-of-type(2) .MuiStepConnector-line',
              aspect: 'touch-target' as const,
              pointer: true,
              token: 'medium',
              label: 'Connector line',
              route: { gutter: 'right' as const },
            },
          ]
        : []),
    ];
  },
  SvgIcon: (values) => [
    {
      on: '.MuiSvgIcon-root',
      aspect: 'icon',
      token: {
        small: 'iconSize - xxSmall',
        medium: 'iconSize',
        large: 'iconSize + 8px',
      }[values.fontSize as string],
      label: 'Icon',
    },
  ],
  Switch: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiSwitch-root',
        aspect: 'touch-target',
        token: small ? 'max(24px, touchTarget - xxSmall)' : 'touchTarget',
        wrap: small,
        label: 'Switch',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiSwitch-thumb',
        aspect: 'touch-target',
        token: small ? 'medium - 4px' : 'medium',
        label: 'Thumb',
        route: { gutter: 'right' },
      },
    ];
  },
  Table: (values) => {
    const small = values.size === 'small';
    const cell = '.MuiTableCell-root:not(.MuiTableCell-paddingCheckbox)';
    return [
      {
        on: `${cell}:last-child`,
        aspect: 'touch-target',
        token: small ? 'touchTarget + xxSmall' : 'touchTarget + 2 × xxSmall',
        label: 'Cell',
        route: { gutter: 'right' },
        wrap: true,
      },
      {
        on: 'tbody .MuiTableCell-root:nth-child(2)',
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'xSmall' : 'small',
        label: 'Cell',
        route: { gutter: 'bottom' },
      },
      {
        on: 'tbody .MuiTableCell-root:nth-child(2)',
        aspect: 'padding',
        axis: 'block',
        token: 'xxSmall',
        label: 'Cell',
        route: { gutter: 'bottom', shift: 130 },
      },
      {
        on: 'thead .MuiTableCell-paddingCheckbox',
        aspect: 'padding',
        axis: 'inline',
        token: '4px',
        label: 'Checkbox cell',
        route: { gutter: 'top' },
      },
      {
        on: 'tbody .MuiTableCell-paddingCheckbox',
        aspect: 'touch-target',
        axis: 'inline',
        token: small ? 'touchTarget + xxSmall' : 'touchTarget + 2 × xxSmall',
        label: 'Checkbox cell',
        route: { gutter: 'bottom', shift: -90 },
      },
      {
        on: 'tbody .MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'touchTarget - xxSmall' : 'touchTarget',
        label: 'Checkbox',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'icon',
        token: 'iconSize + 2px',
        label: 'Sort icon',
        route: { gutter: 'top', line: 'diagonal', shift: 230 },
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'margin',
        axis: 'inline',
        token: 'xxSmall',
        label: 'Sort icon',
        route: { gutter: 'top', shift: 70 },
      },
    ];
  },
  Tabs: (values) => {
    const icon = values.icon === true;
    return [
      {
        on: '.MuiTab-root:nth-of-type(2)',
        aspect: 'touch-target',
        token: icon ? undefined : 'touchTarget',
        label: 'Tab',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiTab-root:nth-of-type(2)',
        aspect: 'padding',
        axis: 'inline',
        token: 'small',
        label: 'Tab',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiTabScrollButton-root',
        aspect: 'touch-target',
        token: 'touchTarget',
        label: 'Scroll button',
        route: { gutter: 'top', out: 1 },
      },
      ...(icon
        ? ([
            {
              on: '.MuiTab-root:nth-of-type(2)',
              aspect: 'padding',
              axis: 'block',
              token: 'xxSmall',
              label: 'Tab',
              route: { gutter: 'bottom', shift: -170, line: 'diagonal' },
            },
            {
              on: '.MuiTab-root:nth-of-type(2)',
              aspect: 'gap',
              token: 'xxSmall',
              label: 'Tab',
              route: { gutter: 'bottom', shift: 130, line: 'diagonal' },
            },
          ] as Claim[])
        : []),
    ];
  },
  TextField: (values) => {
    const small = values.size === 'small';
    const multiline = values.multiline === true;
    const padBlock = small ? '(touchTarget - xxSmall - 1lh) / 2' : '(touchTarget - 1lh) / 2';
    const padOn = (root: string, input: string) => (multiline ? root : input);
    const base =
      '.MuiInputBase-root:not(.MuiInput-root):not(.MuiFilledInput-root):not(.MuiOutlinedInput-root)';
    const baseInput =
      '.MuiInputBase-input:not(.MuiInput-input):not(.MuiFilledInput-input):not(.MuiOutlinedInput-input)';
    return [
      { on: base, aspect: 'touch-target', label: 'InputBase' },
      {
        on: padOn(base, baseInput),
        aspect: 'padding',
        axis: 'block',
        token: multiline ? 'xxSmall' : padBlock,
        label: 'InputBase',
        route: { gutter: 'right' },
      },
      { on: '.MuiInput-root', aspect: 'touch-target', label: 'Standard' },
      {
        on: padOn('.MuiInput-root', '.MuiInput-input'),
        aspect: 'padding',
        axis: 'block',
        token: padBlock,
        label: 'Standard',
        route: { gutter: 'right' },
      },
      { on: '.MuiFilledInput-root', aspect: 'touch-target', label: 'Filled' },
      {
        on: padOn('.MuiFilledInput-root', '.MuiFilledInput-input'),
        aspect: 'padding',
        axis: 'block',
        label: 'Filled',
        route: { gutter: 'right' },
      },
      { on: '.MuiOutlinedInput-root', aspect: 'touch-target', label: 'Outlined' },
      {
        on: padOn('.MuiOutlinedInput-root', '.MuiOutlinedInput-input'),
        aspect: 'padding',
        axis: 'block',
        token: padBlock,
        label: 'Outlined',
        route: { gutter: 'right' },
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'gap',
        token: small ? 'xxSmall' : 'xSmall',
        label: 'Outlined',
      },
      {
        on: '.MuiOutlinedInput-root svg',
        aspect: 'icon',
        token: 'iconSize',
        label: 'Outlined',
        route: { gutter: 'left', shift: 60, line: 'diagonal' },
      },
      {
        on: '.MuiFormHelperText-root',
        aspect: 'margin',
        axis: 'block',
        token: small ? 'xxSmall' : 'xSmall',
        label: 'Helper text',
      },
      {
        on: '.MuiFormHelperText-root',
        aspect: 'margin',
        axis: 'inline',
        token: 'xSmall',
        label: 'Helper text',
        route: { gutter: 'right' },
      },
    ];
  },
  ToggleButton: (values) => {
    const box =
      values.size === 'small'
        ? 'max(24px, touchTarget - xxSmall)'
        : HEIGHT_BY_SIZE[values.size as string];
    return [
      {
        on: '.MuiToggleButton-root:first-of-type',
        aspect: 'touch-target',
        token: box,
        label: 'ToggleButton',
        route: { gutter: 'left' },
      },
      {
        on: '.MuiToggleButton-root:first-of-type',
        aspect: 'padding',
        axis: 'inline',
        token: `(${box} - iconSize - 2px) / 2`,
        label: 'ToggleButton',
        route: { gutter: 'bottom' },
      },
      {
        on: '.MuiToggleButton-root:first-of-type .MuiSvgIcon-root',
        aspect: 'icon',
        token: 'iconSize',
        label: 'Icon',
        route: { gutter: 'top' },
      },
    ];
  },
  Toolbar: (values) => [
    {
      on: '.MuiToolbar-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      label: 'Toolbar',
    },
    {
      on: '.MuiToolbar-root',
      aspect: 'touch-target',
      token: values.dense === true ? 'touchTarget + 2 × xxSmall' : 'touchTarget + 2 × xSmall',
      wrap: true,
      label: 'Toolbar',
    },
  ],
  Tooltip: (values) => [
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Tooltip',
    },
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'block',
      token: 'xSmall',
      label: 'Tooltip',
      route: values.placement === 'right' ? { gutter: 'bottom', at: 0.5 } : { gutter: 'right' },
    },
    ...(values.placement === 'bottom'
      ? [
          {
            on: '.MuiTooltip-tooltip',
            aspect: 'margin' as const,
            axis: 'block' as const,
            token: '4px + 10px / 2',
            label: 'Tooltip',
          },
        ]
      : []),
    ...(values.placement === 'right'
      ? [
          {
            on: '.MuiTooltip-arrow',
            aspect: 'touch-target' as const,
            pointer: true,
            axis: 'block' as const,
            token: '10px',
            label: 'Arrow',
            route: { gutter: 'top' as const, line: 'diagonal' as const, shift: -60 },
          },
          {
            on: '.MuiTooltip-tooltip',
            aspect: 'margin' as const,
            side: 'left' as const,
            token: '4px + 10px / 2',
            label: 'Tooltip',
            route: { gutter: 'bottom' as const, shift: -70 },
          },
        ]
      : []),
  ],
};

export function annotationsFor(family: string, values: Record<string, string | boolean>): Claim[] {
  return DENSITY_ANNOTATIONS[family]?.(values) ?? [];
}
