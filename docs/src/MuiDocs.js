import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import PageContext from './modules/components/PageContext';


export { default as Accordion } from '../pages/material-ui/react-accordion';
export { default as Alert } from '../pages/material-ui/react-alert';
export { default as AppBar } from '../pages/material-ui/react-app-bar';
export { default as Autocomplete } from '../pages/material-ui/react-autocomplete';
export { default as Avatar } from '../pages/material-ui/react-avatar';
export { default as Backdrop } from '../pages/material-ui/react-backdrop';
export { default as Badge } from '../pages/material-ui/react-badge';
export { default as BottomNavigation } from '../pages/material-ui/react-bottom-navigation';
export { default as Box } from '../pages/material-ui/react-box';
export { default as Breadcrumbs } from '../pages/material-ui/react-breadcrumbs';
export { default as ButtonGroup } from '../pages/material-ui/react-button-group';
export { default as Button } from '../pages/material-ui/react-button';
export { default as Card } from '../pages/material-ui/react-card';
export { default as Checkbox } from '../pages/material-ui/react-checkbox';
export { default as Chip } from '../pages/material-ui/react-chip';
export { default as ClickAwayListener } from '../pages/material-ui/react-click-away-listener';
export { default as Container } from '../pages/material-ui/react-container';
export { default as CssBaseline } from '../pages/material-ui/react-css-baseline';
export { default as Dialog } from '../pages/material-ui/react-dialog';
export { default as Divider } from '../pages/material-ui/react-divider';
export { default as Drawer } from '../pages/material-ui/react-drawer';
export { default as FloatingActionButton } from '../pages/material-ui/react-floating-action-button';
export { default as Grid } from '../pages/material-ui/react-grid';
export { default as Grid2 } from '../pages/material-ui/react-grid2';
export { default as Hidden } from '../pages/material-ui/react-hidden';
export { default as ImageList } from '../pages/material-ui/react-image-list';
export { default as Link } from '../pages/material-ui/react-link';
export { default as List } from '../pages/material-ui/react-list';
export { default as Masonry } from '../pages/material-ui/react-masonry';
export { default as Menu } from '../pages/material-ui/react-menu';
export { default as Modal } from '../pages/material-ui/react-modal';
export { default as NoSsr } from '../pages/material-ui/react-no-ssr';
export { default as Pagination } from '../pages/material-ui/react-pagination';
export { default as Paper } from '../pages/material-ui/react-paper';
export { default as Popover } from '../pages/material-ui/react-popover';
export { default as Popper } from '../pages/material-ui/react-popper';
export { default as Portal } from '../pages/material-ui/react-portal';
export { default as Progress } from '../pages/material-ui/react-progress';
export { default as RadioButton } from '../pages/material-ui/react-radio-button';
export { default as Rating } from '../pages/material-ui/react-rating';
export { default as Select } from '../pages/material-ui/react-select';
export { default as Skeleton } from '../pages/material-ui/react-skeleton';
export { default as Slider } from '../pages/material-ui/react-slider';
export { default as Snackbar } from '../pages/material-ui/react-snackbar';
export { default as SpeedDial } from '../pages/material-ui/react-speed-dial';
export { default as Stack } from '../pages/material-ui/react-stack';
export { default as Stepper } from '../pages/material-ui/react-stepper';
export { default as Switch } from '../pages/material-ui/react-switch';
export { default as Table } from '../pages/material-ui/react-table';
export { default as TextField } from '../pages/material-ui/react-text-field';
export { default as TextareaAutosize } from '../pages/material-ui/react-textarea-autosize';
export { default as Timeline } from '../pages/material-ui/react-timeline';
export { default as ToggleButton } from '../pages/material-ui/react-toggle-button';
export { default as Tooltip } from '../pages/material-ui/react-tooltip';
export { default as TransferList } from '../pages/material-ui/react-transfer-list';
export { default as TreeView } from '../pages/material-ui/react-tree-view';
export { default as Typography } from '../pages/material-ui/react-typography';
export { default as UseMediaQuery } from '../pages/material-ui/react-use-media-query';

export const Providers = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <PageContext.Provider value={{ activePage: null, pages: [] }}>
      {children}
    </PageContext.Provider>
  </ThemeProvider>
)
