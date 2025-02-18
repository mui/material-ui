import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function CustomIconButton(props: IconButtonProps) {
  const { children, ...other } = props;
  return (
    <IconButton {...other} color="secondary" size="large">
      {children}
    </IconButton>
  );
}

function classesTest() {
  const defaultProps = {
    count: 1,
    onPageChange: () => {},
    page: 1,
    rowsPerPage: 1,
  };

  <TablePagination classes={{ actions: 'actions' }} {...defaultProps} />;
  // @ts-expect-error desired
  <TablePagination classes={{ alignCenter: 'center' }} {...defaultProps} />;
}

// slots and slotProps type test
<TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={1}
  rowsPerPage={1}
  page={1}
  onPageChange={() => {}}
  showFirstButton
  showLastButton
  slots={{
    actions: {
      firstButton: CustomIconButton,
      lastButton: CustomIconButton,
      nextButton: CustomIconButton,
      previousButton: CustomIconButton,

      firstButtonIcon: SampleIcon,
      lastButtonIcon: SampleIcon,
      nextButtonIcon: SampleIcon,
      previousButtonIcon: SampleIcon,
    },
  }}
  slotProps={{
    actions: {
      firstButton: {
        disableFocusRipple: true,
      },
      lastButton: {
        disableTouchRipple: true,
      },
      nextButton: {
        disableRipple: true,
      },
      previousButton: {
        centerRipple: true,
      },

      firstButtonIcon: {
        fontSize: 'small',
      },
      lastButtonIcon: {
        color: 'success',
      },
      nextButtonIcon: {
        inheritViewBox: true,
      },
      previousButtonIcon: {
        fill: 'currentColor',
      },
    },
    select: {
      size: 'small',
      variant: 'filled',
      hiddenLabel: true,
      disableUnderline: true,
    },
  }}
/>;
