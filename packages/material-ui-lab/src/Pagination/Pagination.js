import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import usePagination from './usePagination';
import PaginationItem from '../PaginationItem';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

const Pagination = React.forwardRef(function Pagination(props, ref) {
  /* eslint-disable no-unused-vars */
  const {
    boundaryCount = 1,
    children,
    classes,
    className,
    color = 'standard',
    count = 1,
    defaultPage = 1,
    disabled = false,
    getItemAriaLabel: getAriaLabel = defaultGetAriaLabel,
    hideNextButton = false,
    hidePrevButton = false,
    renderItem = item => <PaginationItem {...item} />,
    shape = 'round',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'medium',
    variant = 'text',
    ...other
  } = props;
  /* eslint-enable no-unused-vars */

  const { items } = usePagination({ ...props, componentName: 'Pagination' });

  return (
    <nav
      aria-label="pagination navigation"
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <ul className={classes.ul}>
        {children ||
          items.map((item, index) => (
            <li key={index}>
              {renderItem({
                ...item,
                color,
                'aria-label': getAriaLabel(item.type, item.page, item.selected),
                shape,
                size,
                variant,
              })}
            </li>
          ))}
      </ul>
    </nav>
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
   * For localization purposes, you can use the provided [translations](/guides/localization/).
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
   * @param {object} params The props to spread on a PaginationItem.
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
  siblingCount: PropTypes.number,
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
