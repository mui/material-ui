import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { ItemAriaLabelType } from './TablePaginationUnstyled.types';
import {
  TablePaginationActionsUnstyledButtonSlotProps,
  TablePaginationActionsUnstyledProps,
  TablePaginationActionsUnstyledRootSlotProps,
  TablePaginationActionsUnstyledTypeMap,
} from './TablePaginationActionsUnstyled.types';

const LastPageIconDefault = () => <span>{'⇾|'}</span>;
const FirstPageIconDefault = () => <span>{'|⇽'}</span>;
const NextPageIconDefault = () => <span>{'⇾'}</span>;
const BackPageIconDefault = () => <span>{'⇽'}</span>;

function defaultGetAriaLabel(type: ItemAriaLabelType) {
  return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
const TablePaginationActionsUnstyled = React.forwardRef<
  unknown,
  TablePaginationActionsUnstyledProps
>(function TablePaginationActionsUnstyled(props, ref) {
  const {
    component,
    components = {},
    componentsProps = {},
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

  const Root = components.Root ?? component ?? 'div';
  const rootProps: WithOptionalOwnerState<TablePaginationActionsUnstyledRootSlotProps> =
    useSlotProps({
      elementType: Root,
      externalSlotProps: componentsProps.root,
      externalForwardedProps: other,
      additionalProps: { ref },
      ownerState,
    });

  const FirstButton = components.FirstButton ?? 'button';
  const firstButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: FirstButton,
      externalSlotProps: componentsProps.firstButton,
      additionalProps: {
        onClick: handleFirstPageButtonClick,
        disabled: page === 0,
        'aria-label': getItemAriaLabel('first', page),
        title: getItemAriaLabel('first', page),
      },
      ownerState,
    });

  const LastButton = components.LastButton ?? 'button';
  const lastButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: LastButton,
      externalSlotProps: componentsProps.lastButton,
      additionalProps: {
        onClick: handleLastPageButtonClick,
        disabled: page >= Math.ceil(count / rowsPerPage) - 1,
        'aria-label': getItemAriaLabel('last', page),
        title: getItemAriaLabel('last', page),
      },
      ownerState,
    });

  const NextButton = components.NextButton ?? 'button';
  const nextButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: NextButton,
      externalSlotProps: componentsProps.nextButton,
      additionalProps: {
        onClick: handleNextButtonClick,
        disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
        'aria-label': getItemAriaLabel('next', page),
        title: getItemAriaLabel('next', page),
      },
      ownerState,
    });

  const BackButton = components.BackButton ?? 'button';
  const backButtonProps: WithOptionalOwnerState<TablePaginationActionsUnstyledButtonSlotProps> =
    useSlotProps({
      elementType: BackButton,
      externalSlotProps: componentsProps.backButton,
      additionalProps: {
        onClick: handleBackButtonClick,
        disabled: page === 0,
        'aria-label': getItemAriaLabel('previous', page),
        title: getItemAriaLabel('previous', page),
      },
      ownerState,
    });

  const LastPageIcon = components.LastPageIcon ?? LastPageIconDefault;
  const FirstPageIcon = components.FirstPageIcon ?? FirstPageIconDefault;
  const NextPageIcon = components.NextPageIcon ?? NextPageIconDefault;
  const BackPageIcon = components.BackPageIcon ?? BackPageIconDefault;

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
