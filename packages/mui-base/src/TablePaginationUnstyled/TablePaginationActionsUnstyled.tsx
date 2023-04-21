import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import {
  TablePaginationActionsUnstyledButtonSlotProps,
  TablePaginationActionsUnstyledProps,
  TablePaginationActionsUnstyledRootSlotProps,
  TablePaginationActionsUnstyledTypeMap,
} from './TablePaginationActionsUnstyled.types';
import { ItemAriaLabelType } from './common.types';

function LastPageIconDefault() {
  return <span>{'⇾|'}</span>;
}
function FirstPageIconDefault() {
  return <span>{'|⇽'}</span>;
}
function NextPageIconDefault() {
  return <span>{'⇾'}</span>;
}
function BackPageIconDefault() {
  return <span>{'⇽'}</span>;
}

function defaultGetAriaLabel(type: ItemAriaLabelType) {
  return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
const TablePaginationActionsUnstyled = React.forwardRef(function TablePaginationActionsUnstyled(
  props: TablePaginationActionsUnstyledProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    component,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton = false,
    showLastButton = false,
    direction,
    // @ts-ignore
    ownerState: ownerStateProp,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const ownerState = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const Root = slots.root ?? component ?? 'div';
  const rootProps: WithOptionalOwnerState<TablePaginationActionsUnstyledRootSlotProps> =
    useSlotProps({
      elementType: Root,
      externalSlotProps: slotProps.root,
      externalForwardedProps: other,
      additionalProps: { ref: forwardedRef },
      ownerState,
    });

  const FirstButton = slots.firstButton ?? 'button';
  const firstButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: FirstButton,
      externalSlotProps: slotProps.firstButton,
      additionalProps: {
        onClick: handleFirstPageButtonClick,
        disabled: page === 0,
        'aria-label': getItemAriaLabel('first', page),
        title: getItemAriaLabel('first', page),
      },
      ownerState,
    });

  const LastButton = slots.lastButton ?? 'button';
  const lastButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: LastButton,
      externalSlotProps: slotProps.lastButton,
      additionalProps: {
        onClick: handleLastPageButtonClick,
        disabled: page >= Math.ceil(count / rowsPerPage) - 1,
        'aria-label': getItemAriaLabel('last', page),
        title: getItemAriaLabel('last', page),
      },
      ownerState,
    });

  const NextButton = slots.nextButton ?? 'button';
  const nextButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: NextButton,
      externalSlotProps: slotProps.nextButton,
      additionalProps: {
        onClick: handleNextButtonClick,
        disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
        'aria-label': getItemAriaLabel('next', page),
        title: getItemAriaLabel('next', page),
      },
      ownerState,
    });

  const BackButton = slots.backButton ?? 'button';
  const backButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: BackButton,
      externalSlotProps: slotProps.backButton,
      additionalProps: {
        onClick: handleBackButtonClick,
        disabled: page === 0,
        'aria-label': getItemAriaLabel('previous', page),
        title: getItemAriaLabel('previous', page),
      },
      ownerState,
    });

  const LastPageIcon = slots.lastPageIcon ?? LastPageIconDefault;
  const FirstPageIcon = slots.firstPageIcon ?? FirstPageIconDefault;
  const NextPageIcon = slots.nextPageIcon ?? NextPageIconDefault;
  const BackPageIcon = slots.backPageIcon ?? BackPageIconDefault;

  return (
    <Root {...rootProps}>
      {showFirstButton && (
        <FirstButton {...firstButtonProps}>
          {direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </FirstButton>
      )}
      <BackButton {...backButtonProps}>
        {direction === 'rtl' ? <NextPageIcon /> : <BackPageIcon />}
      </BackButton>
      <NextButton {...nextButtonProps}>
        {direction === 'rtl' ? <BackPageIcon /> : <NextPageIcon />}
      </NextButton>
      {showLastButton && (
        <LastButton {...lastButtonProps}>
          {direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </LastButton>
      )}
    </Root>
  );
}) as OverridableComponent<TablePaginationActionsUnstyledTypeMap>;

export default TablePaginationActionsUnstyled;
