import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import usePagination from './usePagination';
import PaginationItem from '../PaginationItem';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0, // Reset
    margin: 0, // Reset
  },
};

const Pagination = React.forwardRef(function Pagination(props, ref) {
  const {
    children,
    classes,
    className,
    color = 'standard',
    getItemAriaLabel: getAriaLabel,
    items,
    renderItem = item => <PaginationItem {...item} />,
    shape = 'round',
    size,
    variant = 'text',
    ...other
  } = usePagination({ ...props, componentName: 'Pagination' });

  const itemProps = { color, getAriaLabel, shape, size, variant };

  return (
    <ul
      role="navigation"
      aria-label="pagination navigation"
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children ||
        items.map(item => (
          <li key={item.type !== undefined ? item.type : item.page.toString()}>
            {renderItem({ ...item, ...itemProps })}
          </li>
        ))}
    </ul>
  );
});

Pagination.propTypes = {
  /**
   * Number of always visible pages at the beginning and end.
   */
  boundaryCount: PropTypes.number,
  /**
   * Pagination items.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * The total number of pages.
   */
  count: PropTypes.number,
  /**
   * The page selected by default when the component is uncontrolled.
   */
  defaultPage: PropTypes.number,
  /**
   * If `true`, all the pagination component will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * @param {string} [type = page] The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous').
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * If `true`, hide the next-page button.
   */
  hideNextButton: PropTypes.bool,
  /**
   * If `true`, hide the previous-page button.
   */
  hidePrevButton: PropTypes.bool,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,
  /**
   * The current page.
   */
  page: PropTypes.number,
  /**
   * Render the item.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderItem: PropTypes.func,
  /**
   * The shape of the pagination items.
   */
  shape: PropTypes.oneOf(['round', 'rounded']),
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: PropTypes.bool,
  /**
   * Number of always visible pages before and after the current page.
   */
  siblingRange: PropTypes.number,
  /**
   * The size of the pagination component.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['text', 'outlined']),
};

export default withStyles(styles, { name: 'MuiPagination' })(Pagination);
