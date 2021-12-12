import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import { appendOwnerState } from '../utils';
import { ItemAriaLabelType } from './TablePaginationUnstyledProps';
import TablePaginationActionsUnstyledProps, {
  TablePaginationActionsUnstyledTypeMap,
} from './TablePaginationActionsUnstyledProps';

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
  const rootProps = appendOwnerState(Root, { ...other, ...componentsProps.root }, ownerState);

  const FirstButton = components.FirstButton ?? 'button';
  const firstButtonProps = appendOwnerState(FirstButton, componentsProps.firstButton, ownerState);

  const LastButton = components.LastButton ?? 'button';
  const lastButtonProps = appendOwnerState(LastButton, componentsProps.lastButton, ownerState);

  const NextButton = components.NextButton ?? 'button';
  const nextButtonProps = appendOwnerState(NextButton, componentsProps.nextButton, ownerState);

  const BackButton = components.BackButton ?? 'button';
  const backButtonProps = appendOwnerState(BackButton, componentsProps.backButton, ownerState);

  const LastPageIcon = components.LastPageIcon ?? LastPageIconDefault;
  const FirstPageIcon = components.FirstPageIcon ?? FirstPageIconDefault;
  const NextPageIcon = components.NextPageIcon ?? NextPageIconDefault;
  const BackPageIcon = components.BackPageIcon ?? BackPageIconDefault;

  return (
    <Root ref={ref} {...rootProps}>
      {showFirstButton && (
        <FirstButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
          {...firstButtonProps}
        >
          {direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </FirstButton>
      )}
      <BackButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        color="inherit"
        aria-label={getItemAriaLabel('previous', page)}
        title={getItemAriaLabel('previous', page)}
        {...backButtonProps}
      >
        {direction === 'rtl' ? <NextPageIcon /> : <BackPageIcon />}
      </BackButton>
      <NextButton
        onClick={handleNextButtonClick}
        disabled={count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        {...nextButtonProps}
      >
        {direction === 'rtl' ? <BackPageIcon /> : <NextPageIcon />}
      </NextButton>
      {showLastButton && (
        <LastButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
          {...lastButtonProps}
        >
          {direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </LastButton>
      )}
    </Root>
  );
}) as OverridableComponent<TablePaginationActionsUnstyledTypeMap>;

export default TablePaginationActionsUnstyled;
