const pages = [
  {
    pathname: '/material/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/material/getting-started/installation' },
      { pathname: '/material/getting-started/usage' },
      { pathname: '/material/getting-started/example-projects' },
      { pathname: '/material/getting-started/templates' },
      { pathname: '/material/getting-started/learn' },
      { pathname: '/material/getting-started/faq', title: 'FAQs' },
      { pathname: '/material/getting-started/supported-components' },
      { pathname: '/material/getting-started/supported-platforms' },
      { pathname: '/material/getting-started/support' },
    ],
  },
  {
    pathname: '/material/components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/material/components',
        subheader: '/material/components/inputs',
        children: [
          { pathname: '/material/components/autocomplete' },
          { pathname: '/material/components/buttons', title: 'Button' },
          { pathname: '/material/components/button-group' },
          { pathname: '/material/components/checkboxes', title: 'Checkbox' },
          { pathname: '/material/components/floating-action-button' },
          { pathname: '/material/components/radio-buttons', title: 'Radio button' },
          { pathname: '/material/components/rating' },
          { pathname: '/material/components/selects', title: 'Select' },
          { pathname: '/material/components/slider' },
          { pathname: '/material/components/switches', title: 'Switch' },
          { pathname: '/material/components/text-fields', title: 'Text field' },
          { pathname: '/material/components/transfer-list' },
          { pathname: '/material/components/toggle-button' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/data-display',
        children: [
          { pathname: '/material/components/avatars', title: 'Avatar' },
          { pathname: '/material/components/badges', title: 'Badge' },
          { pathname: '/material/components/chips', title: 'Chip' },
          { pathname: '/material/components/dividers', title: 'Divider' },
          { pathname: '/material/components/icons' },
          { pathname: '/material/components/material-icons' },
          { pathname: '/material/components/lists', title: 'List' },
          { pathname: '/material/components/tables', title: 'Table' },
          { pathname: '/material/components/tooltips', title: 'Tooltip' },
          { pathname: '/material/components/typography' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/feedback',
        children: [
          { pathname: '/material/components/alert' },
          { pathname: '/material/components/backdrop' },
          { pathname: '/material/components/dialogs' },
          { pathname: '/material/components/progress' },
          { pathname: '/material/components/skeleton' },
          { pathname: '/material/components/snackbars', title: 'Snackbar' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/surfaces',
        children: [
          { pathname: '/material/components/accordion' },
          { pathname: '/material/components/app-bar' },
          { pathname: '/material/components/cards', title: 'Card' },
          { pathname: '/material/components/paper' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/navigation',
        children: [
          { pathname: '/material/components/bottom-navigation' },
          { pathname: '/material/components/breadcrumbs' },
          { pathname: '/material/components/drawers', title: 'Drawer' },
          { pathname: '/material/components/links', title: 'Link' },
          { pathname: '/material/components/menus', title: 'Menu' },
          { pathname: '/material/components/pagination' },
          { pathname: '/material/components/speed-dial' },
          { pathname: '/material/components/steppers', title: 'Stepper' },
          { pathname: '/material/components/tabs' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/layout',
        children: [
          { pathname: '/material/components/box' },
          { pathname: '/material/components/container' },
          { pathname: '/material/components/grid' },
          { pathname: '/material/components/stack' },
          { pathname: '/material/components/image-list' },
          { pathname: '/material/components/hidden' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/utils',
        children: [
          { pathname: '/material/components/click-away-listener' },
          { pathname: '/material/components/css-baseline', title: 'CSS Baseline' },
          { pathname: '/material/components/modal' },
          { pathname: '/material/components/no-ssr', title: 'No SSR' },
          { pathname: '/material/components/popover' },
          { pathname: '/material/components/popper' },
          { pathname: '/material/components/portal' },
          { pathname: '/material/components/textarea-autosize' },
          { pathname: '/material/components/transitions' },
          { pathname: '/material/components/use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/data-grid',
        children: [
          {
            pathname: '/material/components/data-grid',
            subheader: '/material/components/data-grid/overview',
            title: 'Overview',
          },
          { pathname: '/material/components/data-grid/demo' },
          { pathname: '/material/components/data-grid/getting-started' },
          { pathname: '/material/components/data-grid/layout' },
          { pathname: '/material/components/data-grid/columns' },
          { pathname: '/material/components/data-grid/rows' },
          { pathname: '/material/components/data-grid/editing' },
          { pathname: '/material/components/data-grid/sorting' },
          { pathname: '/material/components/data-grid/filtering' },
          { pathname: '/material/components/data-grid/pagination' },
          { pathname: '/material/components/data-grid/selection' },
          { pathname: '/material/components/data-grid/events' },
          { pathname: '/material/components/data-grid/export' },
          { pathname: '/material/components/data-grid/components' },
          { pathname: '/material/components/data-grid/style' },
          { pathname: '/material/components/data-grid/localization' },
          { pathname: '/material/components/data-grid/virtualization' },
          { pathname: '/material/components/data-grid/accessibility' },
          { pathname: '/material/components/data-grid/group-pivot', title: 'Group & Pivot' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/lab',
        children: [
          { pathname: '/material/components/about-the-lab', title: 'About the lab 🧪' },
          {
            pathname: '/material/components',
            subheader: '/material/components/lab-pickers',
            title: 'Date / Time',
            children: [
              { pathname: '/material/components/pickers', title: 'Introduction' },
              { pathname: '/material/components/date-picker' },
              {
                pathname: '/material/components/date-range-picker',
                title: 'Date Range Picker ⚡️',
              },
              { pathname: '/material/components/date-time-picker' },
              { pathname: '/material/components/time-picker' },
            ],
          },
          { pathname: '/material/components/masonry' },
          { pathname: '/material/components/timeline' },
          { pathname: '/material/components/trap-focus' },
          { pathname: '/material/components/tree-view' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/material/api-docs',
    icon: 'CodeIcon',
    children: [
      {
        pathname: '/material/api-docs/accordion',
        linkProps: { linkAs: '/material/api/accordion/' },
      },
      {
        pathname: '/material/api-docs/accordion-actions',
        linkProps: { linkAs: '/material/api/accordion-actions/' },
      },
      {
        pathname: '/material/api-docs/accordion-details',
        linkProps: { linkAs: '/material/api/accordion-details/' },
      },
      {
        pathname: '/material/api-docs/accordion-summary',
        linkProps: { linkAs: '/material/api/accordion-summary/' },
      },
      { pathname: '/material/api-docs/alert', linkProps: { linkAs: '/material/api/alert/' } },
      {
        pathname: '/material/api-docs/alert-title',
        linkProps: { linkAs: '/material/api/alert-title/' },
      },
      { pathname: '/material/api-docs/app-bar', linkProps: { linkAs: '/material/api/app-bar/' } },
      {
        pathname: '/material/api-docs/autocomplete',
        linkProps: { linkAs: '/material/api/autocomplete/' },
      },
      { pathname: '/material/api-docs/avatar', linkProps: { linkAs: '/material/api/avatar/' } },
      {
        pathname: '/material/api-docs/avatar-group',
        linkProps: { linkAs: '/material/api/avatar-group/' },
      },
      { pathname: '/material/api-docs/backdrop', linkProps: { linkAs: '/material/api/backdrop/' } },
      {
        pathname: '/material/api-docs/backdrop-unstyled',
        linkProps: { linkAs: '/material/api/backdrop-unstyled/' },
      },
      { pathname: '/material/api-docs/badge', linkProps: { linkAs: '/material/api/badge/' } },
      {
        pathname: '/material/api-docs/badge-unstyled',
        linkProps: { linkAs: '/material/api/badge-unstyled/' },
      },
      {
        pathname: '/material/api-docs/bottom-navigation',
        linkProps: { linkAs: '/material/api/bottom-navigation/' },
      },
      {
        pathname: '/material/api-docs/bottom-navigation-action',
        linkProps: { linkAs: '/material/api/bottom-navigation-action/' },
      },
      {
        pathname: '/material/api-docs/breadcrumbs',
        linkProps: { linkAs: '/material/api/breadcrumbs/' },
      },
      { pathname: '/material/api-docs/button', linkProps: { linkAs: '/material/api/button/' } },
      {
        pathname: '/material/api-docs/button-base',
        linkProps: { linkAs: '/material/api/button-base/' },
      },
      {
        pathname: '/material/api-docs/button-group',
        linkProps: { linkAs: '/material/api/button-group/' },
      },
      {
        pathname: '/material/api-docs/button-unstyled',
        linkProps: { linkAs: '/material/api/button-unstyled/' },
      },
      {
        pathname: '/material/api-docs/calendar-picker',
        linkProps: { linkAs: '/material/api/calendar-picker/' },
      },
      {
        pathname: '/material/api-docs/calendar-picker-skeleton',
        linkProps: { linkAs: '/material/api/calendar-picker-skeleton/' },
      },
      { pathname: '/material/api-docs/card', linkProps: { linkAs: '/material/api/card/' } },
      {
        pathname: '/material/api-docs/card-action-area',
        linkProps: { linkAs: '/material/api/card-action-area/' },
      },
      {
        pathname: '/material/api-docs/card-actions',
        linkProps: { linkAs: '/material/api/card-actions/' },
      },
      {
        pathname: '/material/api-docs/card-content',
        linkProps: { linkAs: '/material/api/card-content/' },
      },
      {
        pathname: '/material/api-docs/card-header',
        linkProps: { linkAs: '/material/api/card-header/' },
      },
      {
        pathname: '/material/api-docs/card-media',
        linkProps: { linkAs: '/material/api/card-media/' },
      },
      { pathname: '/material/api-docs/checkbox', linkProps: { linkAs: '/material/api/checkbox/' } },
      { pathname: '/material/api-docs/chip', linkProps: { linkAs: '/material/api/chip/' } },
      {
        pathname: '/material/api-docs/circular-progress',
        linkProps: { linkAs: '/material/api/circular-progress/' },
      },
      {
        pathname: '/material/api-docs/click-away-listener',
        linkProps: { linkAs: '/material/api/click-away-listener/' },
      },
      {
        pathname: '/material/api-docs/clock-picker',
        linkProps: { linkAs: '/material/api/clock-picker/' },
      },
      { pathname: '/material/api-docs/collapse', linkProps: { linkAs: '/material/api/collapse/' } },
      {
        pathname: '/material/api-docs/container',
        linkProps: { linkAs: '/material/api/container/' },
      },
      {
        pathname: '/material/api-docs/css-baseline',
        linkProps: { linkAs: '/material/api/css-baseline/' },
      },
      {
        pathname: '/material/api-docs/data-grid',
        title: 'Data Grid',
        children: [
          {
            pathname: '/material/api-docs/data-grid',
            title: 'API Reference',
            linkProps: { linkAs: '/material/api/data-grid/' },
          },
          {
            pathname: '/material/api-docs/data-grid/data-grid',
            title: 'DataGrid',
            linkProps: { linkAs: '/material/api/data-grid/data-grid/' },
          },
          {
            pathname: '/material/api-docs/data-grid/data-grid-pro',
            title: 'DataGridPro',
            linkProps: { linkAs: '/material/api/data-grid/data-grid-pro/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-api',
            title: 'GridApi',
            linkProps: { linkAs: '/material/api/data-grid/grid-api/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-col-def',
            title: 'GridColDef',
            linkProps: { linkAs: '/material/api/data-grid/grid-col-def/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-cell-params',
            title: 'GridCellParams',
            linkProps: { linkAs: '/material/api/data-grid/grid-cell-params/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-row-params',
            title: 'GridRowParams',
            linkProps: { linkAs: '/material/api/data-grid/grid-row-params/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-csv-export-options',
            title: 'GridCSVExportOptions',
            linkProps: { linkAs: '/material/api/data-grid/grid-csv-export-options/' },
          },
          {
            pathname: '/material/api-docs/data-grid/grid-print-export-options',
            title: 'GridPrintExportOptions',
            linkProps: { linkAs: '/material/api/data-grid/grid-print-export-options/' },
          },
        ],
        linkProps: { linkAs: '/material/api/data-grid/' },
      },
      {
        pathname: '/material/api-docs/date-picker',
        linkProps: { linkAs: '/material/api/date-picker/' },
      },
      {
        pathname: '/material/api-docs/date-range-picker',
        linkProps: { linkAs: '/material/api/date-range-picker/' },
      },
      {
        pathname: '/material/api-docs/date-range-picker-day',
        linkProps: { linkAs: '/material/api/date-range-picker-day/' },
      },
      {
        pathname: '/material/api-docs/date-time-picker',
        linkProps: { linkAs: '/material/api/date-time-picker/' },
      },
      {
        pathname: '/material/api-docs/desktop-date-picker',
        linkProps: { linkAs: '/material/api/desktop-date-picker/' },
      },
      {
        pathname: '/material/api-docs/desktop-date-range-picker',
        linkProps: { linkAs: '/material/api/desktop-date-range-picker/' },
      },
      {
        pathname: '/material/api-docs/desktop-date-time-picker',
        linkProps: { linkAs: '/material/api/desktop-date-time-picker/' },
      },
      {
        pathname: '/material/api-docs/desktop-time-picker',
        linkProps: { linkAs: '/material/api/desktop-time-picker/' },
      },
      { pathname: '/material/api-docs/dialog', linkProps: { linkAs: '/material/api/dialog/' } },
      {
        pathname: '/material/api-docs/dialog-actions',
        linkProps: { linkAs: '/material/api/dialog-actions/' },
      },
      {
        pathname: '/material/api-docs/dialog-content',
        linkProps: { linkAs: '/material/api/dialog-content/' },
      },
      {
        pathname: '/material/api-docs/dialog-content-text',
        linkProps: { linkAs: '/material/api/dialog-content-text/' },
      },
      {
        pathname: '/material/api-docs/dialog-title',
        linkProps: { linkAs: '/material/api/dialog-title/' },
      },
      { pathname: '/material/api-docs/divider', linkProps: { linkAs: '/material/api/divider/' } },
      { pathname: '/material/api-docs/drawer', linkProps: { linkAs: '/material/api/drawer/' } },
      { pathname: '/material/api-docs/fab', linkProps: { linkAs: '/material/api/fab/' } },
      { pathname: '/material/api-docs/fade', linkProps: { linkAs: '/material/api/fade/' } },
      {
        pathname: '/material/api-docs/filled-input',
        linkProps: { linkAs: '/material/api/filled-input/' },
      },
      {
        pathname: '/material/api-docs/form-control',
        linkProps: { linkAs: '/material/api/form-control/' },
      },
      {
        pathname: '/material/api-docs/form-control-label',
        linkProps: { linkAs: '/material/api/form-control-label/' },
      },
      {
        pathname: '/material/api-docs/form-control-unstyled',
        linkProps: { linkAs: '/material/api/form-control-unstyled/' },
      },
      {
        pathname: '/material/api-docs/form-group',
        linkProps: { linkAs: '/material/api/form-group/' },
      },
      {
        pathname: '/material/api-docs/form-helper-text',
        linkProps: { linkAs: '/material/api/form-helper-text/' },
      },
      {
        pathname: '/material/api-docs/form-label',
        linkProps: { linkAs: '/material/api/form-label/' },
      },
      {
        pathname: '/material/api-docs/global-styles',
        linkProps: { linkAs: '/material/api/global-styles/' },
      },
      { pathname: '/material/api-docs/grid', linkProps: { linkAs: '/material/api/grid/' } },
      { pathname: '/material/api-docs/grow', linkProps: { linkAs: '/material/api/grow/' } },
      { pathname: '/material/api-docs/hidden', linkProps: { linkAs: '/material/api/hidden/' } },
      { pathname: '/material/api-docs/icon', linkProps: { linkAs: '/material/api/icon/' } },
      {
        pathname: '/material/api-docs/icon-button',
        linkProps: { linkAs: '/material/api/icon-button/' },
      },
      {
        pathname: '/material/api-docs/image-list',
        linkProps: { linkAs: '/material/api/image-list/' },
      },
      {
        pathname: '/material/api-docs/image-list-item',
        linkProps: { linkAs: '/material/api/image-list-item/' },
      },
      {
        pathname: '/material/api-docs/image-list-item-bar',
        linkProps: { linkAs: '/material/api/image-list-item-bar/' },
      },
      { pathname: '/material/api-docs/input', linkProps: { linkAs: '/material/api/input/' } },
      {
        pathname: '/material/api-docs/input-adornment',
        linkProps: { linkAs: '/material/api/input-adornment/' },
      },
      {
        pathname: '/material/api-docs/input-base',
        linkProps: { linkAs: '/material/api/input-base/' },
      },
      {
        pathname: '/material/api-docs/input-label',
        linkProps: { linkAs: '/material/api/input-label/' },
      },
      {
        pathname: '/material/api-docs/input-unstyled',
        linkProps: { linkAs: '/material/api/input-unstyled/' },
      },
      {
        pathname: '/material/api-docs/linear-progress',
        linkProps: { linkAs: '/material/api/linear-progress/' },
      },
      { pathname: '/material/api-docs/link', linkProps: { linkAs: '/material/api/link/' } },
      { pathname: '/material/api-docs/list', linkProps: { linkAs: '/material/api/list/' } },
      {
        pathname: '/material/api-docs/list-item',
        linkProps: { linkAs: '/material/api/list-item/' },
      },
      {
        pathname: '/material/api-docs/list-item-avatar',
        linkProps: { linkAs: '/material/api/list-item-avatar/' },
      },
      {
        pathname: '/material/api-docs/list-item-button',
        linkProps: { linkAs: '/material/api/list-item-button/' },
      },
      {
        pathname: '/material/api-docs/list-item-icon',
        linkProps: { linkAs: '/material/api/list-item-icon/' },
      },
      {
        pathname: '/material/api-docs/list-item-secondary-action',
        linkProps: { linkAs: '/material/api/list-item-secondary-action/' },
      },
      {
        pathname: '/material/api-docs/list-item-text',
        linkProps: { linkAs: '/material/api/list-item-text/' },
      },
      {
        pathname: '/material/api-docs/list-subheader',
        linkProps: { linkAs: '/material/api/list-subheader/' },
      },
      {
        pathname: '/material/api-docs/loading-button',
        linkProps: { linkAs: '/material/api/loading-button/' },
      },
      { pathname: '/material/api-docs/masonry', linkProps: { linkAs: '/material/api/masonry/' } },
      { pathname: '/material/api-docs/menu', linkProps: { linkAs: '/material/api/menu/' } },
      {
        pathname: '/material/api-docs/menu-item',
        linkProps: { linkAs: '/material/api/menu-item/' },
      },
      {
        pathname: '/material/api-docs/menu-list',
        linkProps: { linkAs: '/material/api/menu-list/' },
      },
      {
        pathname: '/material/api-docs/mobile-date-picker',
        linkProps: { linkAs: '/material/api/mobile-date-picker/' },
      },
      {
        pathname: '/material/api-docs/mobile-date-range-picker',
        linkProps: { linkAs: '/material/api/mobile-date-range-picker/' },
      },
      {
        pathname: '/material/api-docs/mobile-date-time-picker',
        linkProps: { linkAs: '/material/api/mobile-date-time-picker/' },
      },
      {
        pathname: '/material/api-docs/mobile-stepper',
        linkProps: { linkAs: '/material/api/mobile-stepper/' },
      },
      {
        pathname: '/material/api-docs/mobile-time-picker',
        linkProps: { linkAs: '/material/api/mobile-time-picker/' },
      },
      { pathname: '/material/api-docs/modal', linkProps: { linkAs: '/material/api/modal/' } },
      {
        pathname: '/material/api-docs/modal-unstyled',
        linkProps: { linkAs: '/material/api/modal-unstyled/' },
      },
      {
        pathname: '/material/api-docs/month-picker',
        linkProps: { linkAs: '/material/api/month-picker/' },
      },
      {
        pathname: '/material/api-docs/native-select',
        linkProps: { linkAs: '/material/api/native-select/' },
      },
      { pathname: '/material/api-docs/no-ssr', linkProps: { linkAs: '/material/api/no-ssr/' } },
      {
        pathname: '/material/api-docs/outlined-input',
        linkProps: { linkAs: '/material/api/outlined-input/' },
      },
      {
        pathname: '/material/api-docs/pagination',
        linkProps: { linkAs: '/material/api/pagination/' },
      },
      {
        pathname: '/material/api-docs/pagination-item',
        linkProps: { linkAs: '/material/api/pagination-item/' },
      },
      { pathname: '/material/api-docs/paper', linkProps: { linkAs: '/material/api/paper/' } },
      {
        pathname: '/material/api-docs/pickers-day',
        linkProps: { linkAs: '/material/api/pickers-day/' },
      },
      { pathname: '/material/api-docs/popover', linkProps: { linkAs: '/material/api/popover/' } },
      { pathname: '/material/api-docs/popper', linkProps: { linkAs: '/material/api/popper/' } },
      {
        pathname: '/material/api-docs/popper-unstyled',
        linkProps: { linkAs: '/material/api/popper-unstyled/' },
      },
      { pathname: '/material/api-docs/portal', linkProps: { linkAs: '/material/api/portal/' } },
      { pathname: '/material/api-docs/radio', linkProps: { linkAs: '/material/api/radio/' } },
      {
        pathname: '/material/api-docs/radio-group',
        linkProps: { linkAs: '/material/api/radio-group/' },
      },
      { pathname: '/material/api-docs/rating', linkProps: { linkAs: '/material/api/rating/' } },
      {
        pathname: '/material/api-docs/scoped-css-baseline',
        linkProps: { linkAs: '/material/api/scoped-css-baseline/' },
      },
      { pathname: '/material/api-docs/select', linkProps: { linkAs: '/material/api/select/' } },
      { pathname: '/material/api-docs/skeleton', linkProps: { linkAs: '/material/api/skeleton/' } },
      { pathname: '/material/api-docs/slide', linkProps: { linkAs: '/material/api/slide/' } },
      { pathname: '/material/api-docs/slider', linkProps: { linkAs: '/material/api/slider/' } },
      {
        pathname: '/material/api-docs/slider-unstyled',
        linkProps: { linkAs: '/material/api/slider-unstyled/' },
      },
      { pathname: '/material/api-docs/snackbar', linkProps: { linkAs: '/material/api/snackbar/' } },
      {
        pathname: '/material/api-docs/snackbar-content',
        linkProps: { linkAs: '/material/api/snackbar-content/' },
      },
      {
        pathname: '/material/api-docs/speed-dial',
        linkProps: { linkAs: '/material/api/speed-dial/' },
      },
      {
        pathname: '/material/api-docs/speed-dial-action',
        linkProps: { linkAs: '/material/api/speed-dial-action/' },
      },
      {
        pathname: '/material/api-docs/speed-dial-icon',
        linkProps: { linkAs: '/material/api/speed-dial-icon/' },
      },
      { pathname: '/material/api-docs/stack', linkProps: { linkAs: '/material/api/stack/' } },
      {
        pathname: '/material/api-docs/static-date-picker',
        linkProps: { linkAs: '/material/api/static-date-picker/' },
      },
      {
        pathname: '/material/api-docs/static-date-range-picker',
        linkProps: { linkAs: '/material/api/static-date-range-picker/' },
      },
      {
        pathname: '/material/api-docs/static-date-time-picker',
        linkProps: { linkAs: '/material/api/static-date-time-picker/' },
      },
      {
        pathname: '/material/api-docs/static-time-picker',
        linkProps: { linkAs: '/material/api/static-time-picker/' },
      },
      { pathname: '/material/api-docs/step', linkProps: { linkAs: '/material/api/step/' } },
      {
        pathname: '/material/api-docs/step-button',
        linkProps: { linkAs: '/material/api/step-button/' },
      },
      {
        pathname: '/material/api-docs/step-connector',
        linkProps: { linkAs: '/material/api/step-connector/' },
      },
      {
        pathname: '/material/api-docs/step-content',
        linkProps: { linkAs: '/material/api/step-content/' },
      },
      {
        pathname: '/material/api-docs/step-icon',
        linkProps: { linkAs: '/material/api/step-icon/' },
      },
      {
        pathname: '/material/api-docs/step-label',
        linkProps: { linkAs: '/material/api/step-label/' },
      },
      { pathname: '/material/api-docs/stepper', linkProps: { linkAs: '/material/api/stepper/' } },
      { pathname: '/material/api-docs/svg-icon', linkProps: { linkAs: '/material/api/svg-icon/' } },
      {
        pathname: '/material/api-docs/swipeable-drawer',
        linkProps: { linkAs: '/material/api/swipeable-drawer/' },
      },
      { pathname: '/material/api-docs/switch', linkProps: { linkAs: '/material/api/switch/' } },
      {
        pathname: '/material/api-docs/switch-unstyled',
        linkProps: { linkAs: '/material/api/switch-unstyled/' },
      },
      { pathname: '/material/api-docs/tab', linkProps: { linkAs: '/material/api/tab/' } },
      {
        pathname: '/material/api-docs/tab-context',
        linkProps: { linkAs: '/material/api/tab-context/' },
      },
      { pathname: '/material/api-docs/tab-list', linkProps: { linkAs: '/material/api/tab-list/' } },
      {
        pathname: '/material/api-docs/tab-panel',
        linkProps: { linkAs: '/material/api/tab-panel/' },
      },
      {
        pathname: '/material/api-docs/tab-panel-unstyled',
        linkProps: { linkAs: '/material/api/tab-panel-unstyled/' },
      },
      {
        pathname: '/material/api-docs/tab-scroll-button',
        linkProps: { linkAs: '/material/api/tab-scroll-button/' },
      },
      {
        pathname: '/material/api-docs/tab-unstyled',
        linkProps: { linkAs: '/material/api/tab-unstyled/' },
      },
      { pathname: '/material/api-docs/table', linkProps: { linkAs: '/material/api/table/' } },
      {
        pathname: '/material/api-docs/table-body',
        linkProps: { linkAs: '/material/api/table-body/' },
      },
      {
        pathname: '/material/api-docs/table-cell',
        linkProps: { linkAs: '/material/api/table-cell/' },
      },
      {
        pathname: '/material/api-docs/table-container',
        linkProps: { linkAs: '/material/api/table-container/' },
      },
      {
        pathname: '/material/api-docs/table-footer',
        linkProps: { linkAs: '/material/api/table-footer/' },
      },
      {
        pathname: '/material/api-docs/table-head',
        linkProps: { linkAs: '/material/api/table-head/' },
      },
      {
        pathname: '/material/api-docs/table-pagination',
        linkProps: { linkAs: '/material/api/table-pagination/' },
      },
      {
        pathname: '/material/api-docs/table-pagination-unstyled',
        linkProps: { linkAs: '/material/api/table-pagination-unstyled/' },
      },
      {
        pathname: '/material/api-docs/table-row',
        linkProps: { linkAs: '/material/api/table-row/' },
      },
      {
        pathname: '/material/api-docs/table-sort-label',
        linkProps: { linkAs: '/material/api/table-sort-label/' },
      },
      { pathname: '/material/api-docs/tabs', linkProps: { linkAs: '/material/api/tabs/' } },
      {
        pathname: '/material/api-docs/tabs-list-unstyled',
        linkProps: { linkAs: '/material/api/tabs-list-unstyled/' },
      },
      {
        pathname: '/material/api-docs/tabs-unstyled',
        linkProps: { linkAs: '/material/api/tabs-unstyled/' },
      },
      {
        pathname: '/material/api-docs/text-field',
        linkProps: { linkAs: '/material/api/text-field/' },
      },
      {
        pathname: '/material/api-docs/textarea-autosize',
        linkProps: { linkAs: '/material/api/textarea-autosize/' },
      },
      {
        pathname: '/material/api-docs/time-picker',
        linkProps: { linkAs: '/material/api/time-picker/' },
      },
      { pathname: '/material/api-docs/timeline', linkProps: { linkAs: '/material/api/timeline/' } },
      {
        pathname: '/material/api-docs/timeline-connector',
        linkProps: { linkAs: '/material/api/timeline-connector/' },
      },
      {
        pathname: '/material/api-docs/timeline-content',
        linkProps: { linkAs: '/material/api/timeline-content/' },
      },
      {
        pathname: '/material/api-docs/timeline-dot',
        linkProps: { linkAs: '/material/api/timeline-dot/' },
      },
      {
        pathname: '/material/api-docs/timeline-item',
        linkProps: { linkAs: '/material/api/timeline-item/' },
      },
      {
        pathname: '/material/api-docs/timeline-opposite-content',
        linkProps: { linkAs: '/material/api/timeline-opposite-content/' },
      },
      {
        pathname: '/material/api-docs/timeline-separator',
        linkProps: { linkAs: '/material/api/timeline-separator/' },
      },
      {
        pathname: '/material/api-docs/toggle-button',
        linkProps: { linkAs: '/material/api/toggle-button/' },
      },
      {
        pathname: '/material/api-docs/toggle-button-group',
        linkProps: { linkAs: '/material/api/toggle-button-group/' },
      },
      { pathname: '/material/api-docs/toolbar', linkProps: { linkAs: '/material/api/toolbar/' } },
      { pathname: '/material/api-docs/tooltip', linkProps: { linkAs: '/material/api/tooltip/' } },
      {
        pathname: '/material/api-docs/tree-item',
        linkProps: { linkAs: '/material/api/tree-item/' },
      },
      {
        pathname: '/material/api-docs/tree-view',
        linkProps: { linkAs: '/material/api/tree-view/' },
      },
      {
        pathname: '/material/api-docs/typography',
        linkProps: { linkAs: '/material/api/typography/' },
      },
      {
        pathname: '/material/api-docs/unstable-trap-focus',
        linkProps: { linkAs: '/material/api/unstable-trap-focus/' },
      },
      {
        pathname: '/material/api-docs/year-picker',
        linkProps: { linkAs: '/material/api/year-picker/' },
      },
      { pathname: '/material/api-docs/zoom', linkProps: { linkAs: '/material/api/zoom/' } },
    ],
  },
  {
    pathname: '/material/customization',
    icon: 'CreateIcon',
    children: [
      {
        pathname: '/material/customization',
        subheader: '/material/customization/theme',
        children: [
          { pathname: '/material/customization/theming' },
          { pathname: '/material/customization/palette' },
          { pathname: '/material/customization/dark-mode', title: 'Dark mode' },
          { pathname: '/material/customization/typography' },
          { pathname: '/material/customization/spacing' },
          { pathname: '/material/customization/breakpoints' },
          { pathname: '/material/customization/density' },
          { pathname: '/material/customization/z-index', title: 'z-index' },
          { pathname: '/material/customization/transitions' },
          { pathname: '/material/customization/theme-components', title: 'Components' },
          { pathname: '/material/customization/default-theme', title: 'Default Theme' },
        ],
      },
      { pathname: '/material/customization/how-to-customize' },
      { pathname: '/material/customization/color' },
      { pathname: '/material/customization/unstyled-components' },
    ],
  },
  {
    pathname: '/material/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      { pathname: '/material/guides/api', title: 'API Design Approach' },
      { pathname: '/material/guides/classname-generator', title: 'ClassName Generator' },
      { pathname: '/material/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/material/guides/typescript', title: 'TypeScript' },
      { pathname: '/material/guides/interoperability', title: 'Style Library Interoperability' },
      { pathname: '/material/guides/styled-engine' },
      { pathname: '/material/guides/minimizing-bundle-size' },
      { pathname: '/material/guides/composition' },
      { pathname: '/material/guides/routing' },
      { pathname: '/material/guides/server-rendering' },
      { pathname: '/material/guides/responsive-ui', title: 'Responsive UI' },
      {
        pathname: '/material/guides/pickers-migration',
        title: 'Migration from @material-ui/pickers',
      },
      { pathname: '/guides/migration-v4', title: 'Migration From v4' },
      { pathname: '/guides/migration-v3', title: 'Migration From v3' },
      { pathname: '/guides/migration-v0x', title: 'Migration From v0.x' },
      { pathname: '/material/guides/testing' },
      { pathname: '/material/guides/localization' },
      { pathname: '/material/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/material/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/material/guides/flow' },
    ],
  },
  {
    pathname: '/material/discover-more',
    icon: 'AddIcon',
    children: [
      { pathname: '/material/discover-more/showcase' },
      { pathname: '/material/discover-more/related-projects' },
      { pathname: '/material/discover-more/roadmap' },
      { pathname: '/material/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/material/discover-more/vision' },
      { pathname: '/material/discover-more/changelog' },
      { pathname: '/material/discover-more/languages' },
      { pathname: '/about', title: 'About us' },
    ],
  },
];

export default pages;
