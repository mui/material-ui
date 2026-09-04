/**
 * What to measure on each family, and what the preset authored for it. Every
 * entry is cross-checked against the emit table, so a `token` is the expression
 * `enhanceDensity` actually writes — never a private `--_*` var, and left off
 * entirely when the authored value is a composite of them.
 *
 * A spec is a function of the toolbar's values, because some rows only exist
 * under one variant.
 */
export const DENSITY_ANNOTATIONS = {
  Accordion: () => [
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'touch-target',
      token: 'touch-target',
      root: true,
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      root: true,
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-content',
      aspect: 'gap',
      token: 'x-small',
      label: 'Summary content',
    },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      root: true,
      label: 'Details',
    },
    // `xx-small` on top, `small` underneath — the two bands get their own captions.
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'block',
      root: true,
      label: 'Details',
    },
  ],
  Alert: () => [
    {
      on: '.MuiAlert-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      root: true,
      label: 'Alert',
    },
    // The root's four slots all sit on one row, so the automatic rules pile
    // three captions into the left gutter. Reporting the block paddings upward
    // as spines spreads them out; the gap needs no offset because rungs are
    // only claimed when captions would overlap in x, and these two don't.
    {
      on: '.MuiAlert-root',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      root: true,
      label: 'Alert',
      place: 'top',
      at: 0.75,
    },
    {
      on: '.MuiAlert-root',
      aspect: 'gap',
      token: 'x-small',
      root: true,
      label: 'Alert',
      place: 'top',
    },
    // `1.1lh` off the alert's own line-height, not a scale step — the icon box
    // reflows with it because the severity svg is `fontSize="inherit"`.
    { on: '.MuiAlert-icon', aspect: 'icon', token: '1.1lh', label: 'Icon' },
    {
      on: '.MuiAlert-icon',
      aspect: 'padding',
      axis: 'block',
      token: '0.75 × spacing',
      label: 'Icon',
      place: 'top',
      at: 0.5,
    },
    {
      on: '.MuiAlert-message',
      aspect: 'padding',
      axis: 'block',
      token: '0.875 × spacing',
      label: 'Message',
      place: 'top',
      at: 0.5,
    },
    // Only exists because of `onClose`; sized by a defaultProp, not a style override.
    {
      on: '.MuiAlert-action .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touch-target',
      label: 'Close button',
    },
  ],
  Autocomplete: (values) => {
    const annotations = [
      {
        on: '.MuiAutocomplete-option',
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Option',
      },
      {
        on: '.MuiAutocomplete-option',
        aspect: 'padding',
        axis: 'inline',
        token: 'x-small',
        label: 'Option',
      },
      {
        on: '.MuiAutocomplete-option',
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        label: 'Option',
      },
      // 3px, and a composite of private vars — px only. The inline axis is not
      // annotated: its right band is master's 39px popup-indicator reserve, and
      // a ring is drawn on both bands of an axis or neither.
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'padding',
        axis: 'block',
        root: true,
        label: 'Input root',
      },
      // ~1px, what is left of the touch target once the root's 3px is taken.
      {
        on: '.MuiAutocomplete-input',
        aspect: 'padding',
        axis: 'block',
        label: 'Input',
      },
      {
        on: '.MuiAutocomplete-input',
        aspect: 'padding',
        axis: 'inline',
        token: '4px',
        label: 'Input',
      },
    ];

    if (values.multiple === true) {
      annotations.push(
        {
          on: '.MuiAutocomplete-tag',
          aspect: 'touch-target',
          token: 'touch-target - x-small',
          label: 'Tag',
        },
        {
          on: '.MuiAutocomplete-tag',
          aspect: 'margin',
          axis: 'inline',
          label: 'Tag',
        },
      );
    }
    return annotations;
  },
  // The only live row: `width`/`height` off one private var, which resolves to
  // the interactive box. The root `fontSize` is the letter's type size, not an icon.
  Avatar: () => [
    {
      on: '.MuiAvatar-root',
      aspect: 'touch-target',
      token: 'touch-target',
      root: true,
      label: 'Avatar',
    },
  ],
  Badge: (values) => [
    // Not `root`: the dashed outline is what makes a 20px chip floating over an
    // icon legible as the box being measured.
    {
      on: '.MuiBadge-badge',
      aspect: 'touch-target',
      token: values.variant === 'dot' ? 'spacing' : '2.5 × spacing',
      label: 'Badge',
    },
    // The dot has no padding at all — master zeroes it and the preset emits none.
    ...(values.variant === 'dot'
      ? []
      : [
          {
            on: '.MuiBadge-badge',
            aspect: 'padding',
            axis: 'inline',
            token: '0.75 × spacing',
            label: 'Badge',
          },
        ]),
  ],
  BottomNavigation: () => [
    {
      on: '.MuiBottomNavigation-root',
      aspect: 'touch-target',
      token: 'xx-large',
      root: true,
      label: 'Bar',
    },
    {
      on: '.MuiBottomNavigationAction-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      label: 'Action',
    },
    // Icon over label — a row gap, not a column one.
    {
      on: '.MuiBottomNavigationAction-root',
      aspect: 'gap',
      token: 'xx-small',
      label: 'Action',
    },
  ],
  // The separator's own margin is zeroed, so the list's gap is the only thing
  // spacing the crumbs — and the same step pads each crumb from the inside.
  Breadcrumbs: () => [
    { on: '.MuiBreadcrumbs-ol', aspect: 'gap', token: 'x-small', label: 'Ol' },
    {
      on: '.MuiBreadcrumbs-ol a',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      label: 'Crumb link',
    },
  ],
  Button: (values) => {
    const height = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size];
    const inline = { small: 'small', medium: 'medium', large: 'large' }[values.size];
    return [
      {
        on: '.MuiButton-root',
        aspect: 'touch-target',
        token: height,
        root: true,
        label: 'Root',
      },
      {
        on: '.MuiButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: inline,
        root: true,
        label: 'Root',
      },
      {
        on: '.MuiButton-root',
        aspect: 'gap',
        token: 'x-small',
        root: true,
        label: 'Root',
      },
      {
        on: '.MuiButton-startIcon',
        aspect: 'icon',
        token: '0.8lh',
        label: 'Start icon',
      },
    ];
  },
  Card: () => [
    {
      on: '.MuiCardHeader-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Header',
    },
    {
      on: '.MuiCardHeader-root',
      aspect: 'gap',
      token: 'small',
      root: true,
      label: 'Header',
    },
    // Negative: the action is pulled back out of the header's own padding.
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-x-small',
      label: 'Header action',
    },
    {
      on: '.MuiCardHeader-action',
      aspect: 'margin',
      axis: 'block',
      token: '-xx-small',
      label: 'Header action',
    },
    {
      on: '.MuiCardContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Content',
    },
    // `padding: medium` with `paddingTop: 0` — only the bottom band is live.
    {
      on: '.MuiCardActions-root',
      aspect: 'padding',
      axis: 'block',
      token: 'medium',
      root: true,
      label: 'Actions',
    },
    {
      on: '.MuiCardActions-root',
      aspect: 'gap',
      token: 'x-small',
      root: true,
      label: 'Actions',
    },
  ],
  Checkbox: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        root: true,
        label: 'Checkbox',
      },
      // `medium` measures 16px, which `caption` already names `icon-target`.
      {
        on: '.MuiCheckbox-root',
        aspect: 'icon',
        token: small ? 'icon-target - 0.25 × spacing' : undefined,
        label: 'Checkbox icon',
      },
      // Authored on the checkbox as `.MuiFormControlLabel-root:has(&)`, so the
      // band lands on the label: the control is pulled back by half its gutter.
      {
        on: '.MuiFormControlLabel-root',
        aspect: 'margin',
        axis: 'inline',
        token: small
          ? '(touch-target - x-small - (icon-target - 0.25 × spacing)) / -2'
          : '(touch-target - icon-target) / -2',
        root: true,
        label: 'Label',
      },
    ];
  },
  Chip: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiChip-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - xx-small' : 'touch-target',
        root: true,
        label: 'Chip',
      },
      {
        on: '.MuiChip-root',
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'x-small' : 'small',
        root: true,
        label: 'Chip',
      },
      {
        on: '.MuiChip-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        root: true,
        label: 'Chip',
      },
      // Two classes deep, so it beats the Avatar root's own 32px box.
      {
        on: '.MuiChip-avatar',
        aspect: 'touch-target',
        token: small
          ? 'touch-target - xx-small - x-small'
          : 'touch-target - x-small',
        label: 'Avatar',
      },
      // Negative: the child is pulled back out of the root's inline padding.
      // The offset is a composite of three private vars, so the caption is px only.
      { on: '.MuiChip-avatar', aspect: 'margin', axis: 'inline', label: 'Avatar' },
    ];
  },
  Dialog: () => [
    // `medium` on the left, `small` on the right — two bands, two captions, so a
    // single token would mislabel one of them.
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      axis: 'inline',
      root: true,
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root',
      aspect: 'padding',
      axis: 'block',
      token: 'small',
      root: true,
      label: 'Title',
    },
    {
      on: '.MuiDialogTitle-root .MuiIconButton-root',
      aspect: 'touch-target',
      token: 'touch-target',
      label: 'Close button',
    },
    // Block padding is 0, so the inline pair is the only live one.
    {
      on: '.MuiDialogContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Content',
    },
    {
      on: '.MuiDialogActions-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Actions',
    },
    {
      on: '.MuiDialogActions-root',
      aspect: 'gap',
      token: 'small',
      root: true,
      label: 'Actions',
    },
  ],
  // Three sizes, three different expressions for one box — the only thing this
  // family emits beyond a `minHeight: 0` reset.
  Fab: (values) => [
    {
      on: '.MuiFab-root',
      aspect: 'touch-target',
      token: {
        small: 'large + small',
        medium: 'touch-target + x-small',
        large: 'xx-large + xx-small',
      }[values.size],
      root: true,
      label: 'Fab',
    },
  ],
  List: (values) => {
    const dense = values.dense === true;
    return [
      // `spacing(1)`, the base unit — not the `x-small` step that shares its px.
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: 'spacing',
        root: true,
        label: 'List',
      },
      // Dense drops the text to `body2`, so the row sits above its own floor and
      // the box is content-sized: no token to name then.
      {
        on: '.MuiListItemButton-root',
        aspect: 'touch-target',
        token: dense ? undefined : 'touch-target',
        root: true,
        label: 'Item',
      },
      {
        on: '.MuiListItemButton-root',
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        root: true,
        label: 'Item',
      },
      {
        on: '.MuiListItemButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: dense ? 'x-small' : 'small',
        root: true,
        label: 'Item',
      },
      {
        on: '.MuiListItemButton-root',
        aspect: 'gap',
        token: 'x-small',
        root: true,
        label: 'Item',
      },
    ];
  },
  Menu: (values) => {
    const dense = values.dense === true;
    return [
      // `spacing(1)`, the base unit — not the `x-small` step that shares its px.
      {
        on: '.MuiList-root',
        aspect: 'padding',
        axis: 'block',
        token: 'spacing',
        root: true,
        label: 'MenuList',
      },
      // Dense replaces the floor with `auto`: the item is content-sized, so
      // there is no box to name.
      ...(dense
        ? []
        : [
            {
              on: '.MuiMenuItem-root',
              aspect: 'touch-target',
              token: 'touch-target',
              root: true,
              label: 'Item',
            },
          ]),
      {
        on: '.MuiMenuItem-root',
        aspect: 'padding',
        axis: 'block',
        token: 'xx-small',
        root: true,
        label: 'Item',
      },
      {
        on: '.MuiMenuItem-root',
        aspect: 'padding',
        axis: 'inline',
        token: 'x-small',
        root: true,
        label: 'Item',
      },
      {
        on: '.MuiMenuItem-root',
        aspect: 'gap',
        token: 'x-small',
        root: true,
        label: 'Item',
      },
      // Only dense sizes the glyph, and it rides the line box, not the scale.
      ...(dense
        ? [
            {
              on: '.MuiMenuItem-root .MuiListItemIcon-root svg',
              aspect: 'icon',
              token: '0.8lh',
              label: 'Item icon',
            },
          ]
        : []),
    ];
  },
  Pagination: (values) => {
    // Medium is left tokenless so the caption reads `touch-target (32px)`
    // rather than repeating the same number twice.
    const box = {
      small: 'touch-target - x-small',
      large: 'touch-target + small',
    }[values.size];
    return [
      // `-page`, not `-root`: the first root is the previous-page arrow.
      {
        on: '.MuiPaginationItem-page',
        aspect: 'touch-target',
        token: box,
        root: true,
        label: 'Item',
      },
      // The items' own margin is zeroed, so the list's gap is the whole story.
      { on: '.MuiPagination-ul', aspect: 'gap', token: 'x-small', label: 'Ul' },
    ];
  },
  Progress: () => [
    // `spacing / 2` is a multiplier off the base unit, not a scale step — left
    // unnamed the caption would claim `xx-small`.
    {
      on: '.MuiLinearProgress-root',
      aspect: 'touch-target',
      token: 'spacing / 2',
      root: true,
      label: 'Linear bar',
    },
    {
      on: '.MuiCircularProgress-root',
      aspect: 'touch-target',
      token: 'touch-target',
      root: true,
      label: 'Circular',
    },
  ],
  // Radio and Checkbox share one preset object, so the rows are identical.
  Radio: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiRadio-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        root: true,
        label: 'Radio',
      },
      {
        on: '.MuiRadio-root',
        aspect: 'icon',
        token: small ? 'icon-target - 0.25 × spacing' : undefined,
        label: 'Radio icon',
      },
      {
        on: '.MuiFormControlLabel-root',
        aspect: 'margin',
        axis: 'inline',
        token: small
          ? '(touch-target - x-small - (icon-target - 0.25 × spacing)) / -2'
          : '(touch-target - icon-target) / -2',
        root: true,
        label: 'Label',
      },
    ];
  },
  Select: (values) => {
    const small = values.size === 'small';
    return [
      // At `small` both bands come off different rows that agree on 4px, so the
      // reverse lookup names the step and an explicit token would only be able
      // to lie once they diverge.
      {
        on: '.MuiInputBase-input',
        aspect: 'padding',
        axis: 'block',
        token: small ? undefined : 'x-small',
        label: 'Select value',
      },
      {
        on: '.MuiInputBase-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        root: true,
        label: 'Input root',
      },
    ];
  },
  Slider: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiSlider-root',
        aspect: 'touch-target',
        token: 'touch-target',
        root: true,
        label: 'Root',
      },
      {
        on: '.MuiSlider-thumb',
        aspect: 'touch-target',
        token: small ? 'small' : 'medium',
        label: 'Thumb',
      },
      // A thickness, told with a dimension line — the caption says so.
      {
        on: '.MuiSlider-rail',
        aspect: 'touch-target',
        token: small ? 'x-small / 4' : 'small / 4',
        label: 'Rail',
      },
    ];
  },
  SnackbarContent: () => [
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Snackbar',
    },
    // The base unit, not `x-small` — both are 8px today and diverge on a rescale.
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'padding',
      axis: 'block',
      token: 'spacing',
      root: true,
      label: 'Snackbar',
    },
    {
      on: '.MuiSnackbarContent-root',
      aspect: 'gap',
      token: 'small',
      root: true,
      label: 'Snackbar',
    },
    {
      on: '.MuiSnackbarContent-message',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      label: 'Message',
    },
    // Negative: the action is pulled back out of the root's own padding.
    {
      on: '.MuiSnackbarContent-action',
      aspect: 'margin',
      axis: 'inline',
      token: '-x-small',
      label: 'Action',
    },
  ],
  Stepper: (values) => {
    const vertical = values.orientation === 'vertical';
    return [
      // The icon→label spacing falls out of centering the circle in this box.
      {
        on: '.MuiStepLabel-iconContainer',
        aspect: 'touch-target',
        token: 'touch-target',
        label: 'Icon container',
      },
      // An SvgIcon sizes off its own font size, so the circle is set here.
      {
        on: '.MuiStepIcon-root',
        aspect: 'icon',
        token: 'touch-target - small + 2px',
        label: 'Step icon',
      },
      // Vertical only: half the box lands the rule on the icon's center, and
      // margin + padding lines the content up with the label.
      ...(vertical
        ? [
            {
              on: '.MuiStepConnector-root',
              aspect: 'margin',
              axis: 'inline',
              token: 'touch-target / 2',
              root: true,
              label: 'Connector',
            },
            {
              on: '.MuiStepContent-root',
              aspect: 'margin',
              axis: 'inline',
              token: 'touch-target / 2',
              root: true,
              label: 'Content',
            },
            {
              on: '.MuiStepContent-root',
              aspect: 'padding',
              axis: 'inline',
              token: 'touch-target / 2 - 1px',
              root: true,
              label: 'Content',
            },
          ]
        : []),
    ];
  },
  // One prop, three variants: `fontSize` is the icon aspect here because the
  // slot is the `svg` itself, and `medium` lands on `icon-target` unaided.
  SvgIcon: (values) => [
    {
      on: '.MuiSvgIcon-root',
      aspect: 'icon',
      token: {
        small: 'icon-target - 0.25 × spacing',
        medium: undefined,
        large: 'icon-target + 0.5 × spacing',
      }[values.fontSize],
      label: 'Icon',
    },
  ],
  Switch: (values) => {
    const small = values.size === 'small';
    return [
      {
        on: '.MuiSwitch-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        root: true,
        label: 'Switch',
      },
      // The pad is authored from the track height and the thumb together, so no
      // single step names it — px only.
      {
        on: '.MuiSwitch-root',
        aspect: 'padding',
        axis: 'block',
        root: true,
        label: 'Switch',
      },
      // Same composite, negated: the root is pulled back under the label.
      {
        on: '.MuiSwitch-root',
        aspect: 'margin',
        axis: 'inline',
        root: true,
        label: 'Switch',
      },
      {
        on: '.MuiSwitch-switchBase',
        aspect: 'padding',
        axis: 'inline',
        token: small
          ? '(touch-target - x-small - (medium - 4px)) / 2'
          : '(touch-target - medium) / 2',
        label: 'Switch base',
      },
      {
        on: '.MuiSwitch-thumb',
        aspect: 'touch-target',
        token: small ? 'medium - 4px' : 'medium',
        label: 'Thumb',
      },
    ];
  },
  Table: (values) => {
    const small = values.size === 'small';
    // The checkbox column comes first, so the size rows have to skip it or they
    // would caption the wrong cell — `querySelector` takes the first match.
    const cell = '.MuiTableCell-root:not(.MuiTableCell-paddingCheckbox)';
    return [
      {
        on: cell,
        aspect: 'touch-target',
        token: small ? 'large + xx-small' : 'x-large + x-small',
        root: true,
        label: 'Cell',
      },
      {
        on: cell,
        aspect: 'padding',
        axis: 'inline',
        token: small ? 'x-small' : 'small',
        root: true,
        label: 'Cell',
      },
      // `0 0 0 4px` — only the left band is live, so the token lands on it alone.
      {
        on: '.MuiTableCell-paddingCheckbox',
        aspect: 'padding',
        axis: 'inline',
        token: 'spacing / 2',
        label: 'Checkbox cell',
      },
      {
        on: '.MuiCheckbox-root',
        aspect: 'touch-target',
        token: small ? 'touch-target - x-small' : 'touch-target',
        root: true,
        label: 'Checkbox',
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'icon',
        token: 'icon-target + spacing / 4',
        label: 'Sort icon',
      },
      {
        on: '.MuiTableSortLabel-icon',
        aspect: 'margin',
        axis: 'inline',
        token: 'xx-small',
        label: 'Sort icon',
      },
    ];
  },
  Tabs: (values) => {
    const icon = values.icon === true;
    return [
      // With an icon on top the stack outgrows both floors, so the bar's own
      // box stops being the density number and the row is dropped.
      ...(icon
        ? []
        : [
            {
              on: '.MuiTabs-root',
              aspect: 'touch-target',
              token: 'touch-target',
              root: true,
              label: 'Tabs',
            },
          ]),
      {
        on: '.MuiTab-root',
        aspect: 'touch-target',
        token: icon ? undefined : 'touch-target',
        root: true,
        label: 'Tab',
      },
      {
        on: '.MuiTab-root',
        aspect: 'padding',
        axis: 'inline',
        token: 'small',
        root: true,
        label: 'Tab',
      },
      // Without an icon the block padding is `0` and there is nothing for the
      // gap to separate; both rows only exist under the icon+label variant,
      // where the tab stacks and the gap is a vertical one.
      ...(icon
        ? [
            {
              on: '.MuiTab-root',
              aspect: 'padding',
              axis: 'block',
              token: 'xx-small',
              root: true,
              label: 'Tab',
            },
            {
              on: '.MuiTab-root',
              aspect: 'gap',
              token: 'xx-small',
              root: true,
              label: 'Tab',
            },
          ]
        : []),
    ];
  },
  TextField: (values) => {
    const small = values.size === 'small';
    // The bare InputBase is the only root carrying none of the variant classes.
    const base =
      '.MuiInputBase-root:not(.MuiInput-root):not(.MuiFilledInput-root):not(.MuiOutlinedInput-root)';
    const baseInput =
      '.MuiInputBase-input:not(.MuiInput-input):not(.MuiFilledInput-input):not(.MuiOutlinedInput-input)';
    return [
      // Measured, not emitted — four different inputs landing on one number is
      // the whole claim, so each row carries its own beam.
      { on: base, aspect: 'touch-target', root: true, label: 'InputBase' },
      {
        on: baseInput,
        aspect: 'padding',
        axis: 'block',
        token: small ? 'xx-small' : 'x-small',
        label: 'InputBase',
      },
      {
        on: '.MuiInput-root',
        aspect: 'touch-target',
        root: true,
        label: 'Standard',
      },
      // 8px top, 6px bottom — two values, so no single token can name them.
      { on: '.MuiInput-input', aspect: 'padding', axis: 'block', label: 'Standard' },
      {
        on: '.MuiFilledInput-root',
        aspect: 'touch-target',
        root: true,
        label: 'Filled',
      },
      // Asymmetric: `large` on top, `small` underneath — two captions.
      {
        on: '.MuiFilledInput-input',
        aspect: 'padding',
        axis: 'block',
        label: 'Filled',
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'touch-target',
        root: true,
        label: 'Outlined',
      },
      {
        on: '.MuiOutlinedInput-input',
        aspect: 'padding',
        axis: 'block',
        token: small ? 'xx-small' : '(touch-target - 1lh) / 2',
        label: 'Outlined',
      },
      {
        on: '.MuiOutlinedInput-root',
        aspect: 'gap',
        token: small ? 'xx-small' : 'x-small',
        root: true,
        label: 'Outlined',
      },
      {
        on: '.MuiFormHelperText-root',
        aspect: 'margin',
        axis: 'block',
        token: 'x-small',
        label: 'Helper text',
      },
    ];
  },
  ToggleButton: (values) => {
    const box = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size];
    // Not the icon: the button never resizes its children, so this term is a
    // nominal content width off the spacing base and stays 16px throughout.
    const inner = {
      small: '1.75 × spacing',
      medium: '2 × spacing',
      large: '2.5 × spacing',
    }[values.size];

    return [
      {
        on: '.MuiToggleButton-root',
        aspect: 'touch-target',
        token: box,
        root: true,
        label: 'ToggleButton',
      },
      {
        on: '.MuiToggleButton-root',
        aspect: 'padding',
        axis: 'inline',
        token: `(${box} - ${inner}) / 2 - 1px`,
        root: true,
        label: 'ToggleButton',
      },
      { on: '.MuiSvgIcon-root', aspect: 'icon', label: 'Icon' },
    ];
  },
  // One ring, two captions: the bar has no floor left, so its height is the
  // block padding plus whatever it holds.
  Toolbar: (values) => [
    {
      on: '.MuiToolbar-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'medium',
      root: true,
      label: 'Toolbar',
    },
    {
      on: '.MuiToolbar-root',
      aspect: 'padding',
      axis: 'block',
      token: values.dense === true ? 'xx-small' : 'x-small',
      root: true,
      label: 'Toolbar',
    },
  ],
  Tooltip: (values) => [
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      root: true,
      label: 'Tooltip',
    },
    {
      on: '.MuiTooltip-tooltip',
      aspect: 'padding',
      axis: 'block',
      token: 'x-small',
      root: true,
      label: 'Tooltip',
    },
    // The offset is placement-shaped. At `bottom` it is one clean top band; at
    // `right` master's surviving 2px sits on the opposite side and would take a
    // second band under the same, wrong, token.
    ...(values.placement === 'bottom'
      ? [
          {
            on: '.MuiTooltip-tooltip',
            aspect: 'margin',
            axis: 'block',
            token: '0.5 × spacing',
            root: true,
            label: 'Tooltip',
          },
        ]
      : []),
    // Only at a side placement is the arrow's 11px its height.
    ...(values.placement === 'right'
      ? [
          {
            on: '.MuiTooltip-arrow',
            aspect: 'touch-target',
            token: '1.375 × spacing',
            label: 'Arrow',
          },
        ]
      : []),
  ],
};

/** What to draw for a family at the toolbar's current values. */
export function annotationsFor(family, values) {
  return DENSITY_ANNOTATIONS[family]?.(values) ?? [];
}
