import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { componentPropType } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import BreadcrumbSeparator from './BreadcrumbSeparator';

const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the ol element. */
  ol: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0, // Reset
    margin: 0, // Reset
    '& li': {
      listStyle: 'none',
    },
  },
  /* Styles applied to the li element. */
  li: {},
  /* Styles applied to the separator element. */
  separator: {},
};

class Breadcrumbs extends React.Component {
  state = {
    expanded: false,
  };

  handleClickExpand = () => {
    this.setState({ expanded: true });
  };

  insertSeparators(items) {
    return items.reduce((acc, current, index) => {
      if (index < items.length - 1) {
        acc = acc.concat(
          current,
          <BreadcrumbSeparator
            // eslint-disable-next-line react/no-array-index-key
            key={`separator-${index}`}
            className={this.props.classes.separator}
          >
            {this.props.separator}
          </BreadcrumbSeparator>,
        );
      } else {
        acc.push(current);
      }

      return acc;
    }, []);
  }

  renderItemsBeforeAndAfter(allItems) {
    const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = this.props;

    // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      warning(
        false,
        [
          'Material-UI: you have provided an invalid combination of properties to the Breadcrumbs.',
          // eslint-disable-next-line max-len
          `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`,
        ].join('\n'),
      );
      return allItems;
    }

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <BreadcrumbCollapsed key="ellipsis" onClick={this.handleClickExpand} />,
      ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
    ];
  }

  render() {
    const {
      children,
      classes,
      className: classNameProp,
      component: Component,
      itemsAfterCollapse,
      itemsBeforeCollapse,
      maxItems,
      separator,
      ...other
    } = this.props;

    const allItems = React.Children.toArray(children)
      .filter(child => React.isValidElement(child))
      .map((child, index) => (
        <li className={classes.li} key={String(index)}>
          {child}
        </li>
      ));

    return (
      <Typography
        component={Component}
        color="textSecondary"
        className={clsx(classes.root, classNameProp)}
        {...other}
      >
        <ol className={classes.ol}>
          {this.insertSeparators(
            this.state.expanded || (maxItems && allItems.length <= maxItems)
              ? allItems
              : this.renderItemsBeforeAndAfter(allItems),
          )}
        </ol>
      </Typography>
    );
  }
}

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
  component: componentPropType,
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

Breadcrumbs.defaultProps = {
  component: 'nav',
  itemsAfterCollapse: 1,
  itemsBeforeCollapse: 1,
  maxItems: 8,
  separator: '/',
};

export default withStyles(styles, { name: 'MuiBreadcrumbs' })(Breadcrumbs);
