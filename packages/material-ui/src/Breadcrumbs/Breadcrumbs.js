import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the ol element. */
  ol: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0, // Reset
    margin: 0, // Reset
  },
  /* Styles applied to the li element. */
  li: {
    listStyle: 'none',
  },
  /* Styles applied to the separator element. */
  separator: {},
};

function insertSeparators(items, className, separator) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <BreadcrumbSeparator
          // eslint-disable-next-line react/no-array-index-key
          key={`separator-${index}`}
          className={className}
        >
          {separator}
        </BreadcrumbSeparator>,
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = React.forwardRef(function Breadcrumbs(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'nav',
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = '/',
    ...other
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const renderItemsBeforeAndAfter = allItems => {
    const handleClickExpand = () => {
      setExpanded(true);
    };

    // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      warning(
        false,
        [
          'Material-UI: you have provided an invalid combination of properties to the Breadcrumbs.',
          `itemsAfterCollapse={${itemsAfterCollapse}} +itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`,
        ].join('\n'),
      );
      return allItems;
    }

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <BreadcrumbCollapsed key="ellipsis" onClick={handleClickExpand} />,
      ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
    ];
  };

  const allItems = React.Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .map((child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className={classes.li} key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <Typography
      ref={ref}
      component={Component}
      color="textSecondary"
      className={clsx(classes.root, className)}
      {...other}
    >
      <ol className={classes.ol}>
        {insertSeparators(
          expanded || (maxItems && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
          classes.separator,
          separator,
        )}
      </ol>
    </Typography>
  );
});

Breadcrumbs.propTypes = {
  /**
   * The breadcrumb children.
   */
  children: PropTypes.node.isRequired,
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component: PropTypes.elementType,
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   */
  itemsAfterCollapse: PropTypes.number,
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   */
  itemsBeforeCollapse: PropTypes.number,
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first and last will be shown, with an
   * ellipsis in between.
   */
  maxItems: PropTypes.number,
  /**
   * Custom separator node.
   */
  separator: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiBreadcrumbs' })(Breadcrumbs);
