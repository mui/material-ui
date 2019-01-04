import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BreadcrumbCollapsed from '@material-ui/lab/BreadcrumbCollapsed';

const height = 24;
const defaultMaxItems = 8;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  separator: {
    userSelect: 'none',
    display: 'inline-block',
    height,
    lineHeight: `${height}px`,
    color: theme.palette.grey[400],
    marginLeft: 4,
    marginRight: 4,
    paddingLeft: 2,
    paddingRight: 2,
  },
});

function DefaultSeparator(props) {
  const { className, separatorText } = props;
  return <div className={className}>{separatorText}</div>;
}

DefaultSeparator.propTypes = {
  className: PropTypes.object.isRequired,
  separatorText: PropTypes.string.isRequired,
};

class Breadcrumbs extends React.PureComponent {
  state = {
    expanded: false,
  };

  getSeparator(props) {
    const { separator: Separator } = this.props;
    if (Separator) {
      let className = props.className;
      if (typeof Separator === 'function') {
        return <Separator {...props} className={className} />;
      }
      if (React.isValidElement(Separator)) {
        className = classNames(className, Separator.props.className);
        return React.cloneElement(Separator, {
          ...props,
          className,
        });
      }
    }
    return <DefaultSeparator {...props} />;
  }

  expand(e) {
    e.preventDefault();
    this.setState({ expanded: true });
  }

  insertSeparators(items) {
    const { classes, separatorText, separator } = this.props;

    return items.reduce((arr, v, i, source) => {
      return i < source.length - 1
        ? arr.concat(
            v,
            this.getSeparator(
              separator
                ? {
                    key: `separator-${i}`,
                    className: classes.separator,
                  }
                : {
                    key: `separator-${i}`,
                    className: classes.separator,
                    separatorText,
                  },
            ),
          )
        : arr.concat(v);
    }, []);
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
      <BreadcrumbCollapsed key="ellipsis" onClick={e => this.expand(e)} />,
      ...afterItems,
    ];
  }

  renderAllItems() {
    const allNonEmptyItems = Children.toArray(this.props.children);
    return allNonEmptyItems.map(child => React.cloneElement(child, {}));
  }

  render() {
    const {
      classes,
      children,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      separator,
      separatorText,
      ...rest
    } = this.props;

    if (!children) return <div className={classes.root} {...rest} />;

    return (
      <div className={classes.root} {...rest}>
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
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  /**
   * Custom text separator.
   */
  separatorText: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  children: null,
  maxItems: defaultMaxItems,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  separatorText: '/',
};

export default withStyles(styles, { name: 'MuiBreadcrumbs' })(Breadcrumbs);
