import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BreadcrumbCollapsed from '@material-ui/lab/BreadcrumbCollapsed';
import BreadcrumbSeparator from '@material-ui/lab/BreadcrumbSeparator';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
};

class Breadcrumbs extends React.Component {
  state = {
    expanded: false,
  };

  handleClickExpand = event => {
    event.preventDefault();
    this.setState({ expanded: true });
  };

  insertSeparators(items) {
    const { separator, separatorText } = this.props;

    return items.reduce(
      (acc, cur, idx, src) =>
        idx < src.length - 1
          ? acc.concat(
              cur,
              <BreadcrumbSeparator
                // eslint-disable-next-line react/no-array-index-key
                key={`separator-${idx}`}
                separator={separator}
                separatorText={separatorText}
              />,
            )
          : acc.concat(cur),
      [],
    );
  }

  renderItemsBeforeAndAfter() {
    const { itemsBeforeCollapse, itemsAfterCollapse } = this.props;
    const allItems = this.renderAllItems();
    // This defends against someone passing weird data, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      return allItems;
    }

    const beforeItems = allItems.slice(0, itemsBeforeCollapse);
    const afterItems = allItems.slice(allItems.length - itemsAfterCollapse, allItems.length);

    return [
      ...beforeItems,
      <BreadcrumbCollapsed key="ellipsis" onClick={this.handleClickExpand} />,
      ...afterItems,
    ];
  }

  renderAllItems() {
    return Children.toArray(this.props.children);
  }

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      separator,
      separatorText,
      ...rest
    } = this.props;

    const className = classNames(classes.root, classNameProp);

    if (!children) return <div className={className} {...rest} />;

    return (
      <div aria-label="breadcrumb" className={className} {...rest}>
        {this.state.expanded || (maxItems && Children.toArray(children).length <= maxItems)
          ? this.insertSeparators(this.renderAllItems())
          : this.insertSeparators(this.renderItemsBeforeAndAfter())}
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  /**
   * A single `Breadcrumb` or an array of `Breadcrumb`s.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
   * Custom separator component.
   */
  separator: PropTypes.element,
  /**
   * Custom text separator.
   */
  separatorText: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  children: null,
  maxItems: 8,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  separatorText: '/',
};

export default withStyles(styles, { name: 'MuiBreadcrumbs' })(Breadcrumbs);
