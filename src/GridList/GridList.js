import React, {Component, PropTypes} from 'react';

function getStyles(props) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: -7,
    },
    item: {
      boxSizing: 'border-box',
      padding: 15,
    },
  };
}

class GridList extends Component {
  static propTypes = {
    /**
     * Number of px for one cell height.
     */
    cellHeight: PropTypes.number,
    /**
     * Grid Tiles that will be in Grid List.
     */
    children: PropTypes.node,
    /**
     * Number of columns.
     */
    cols: PropTypes.number,
    /**
     * Number of px for the padding/spacing between items.
     */
    padding: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    cols: 2,
    padding: 10,
    cellHeight: 130,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      cols,
      padding,
      cellHeight,
      children,
      style,
      ...other,
    } = this.props;

    const tileSize = 80;
    const tilePadding = 30;
    const tileTitleHieght = 20;
    
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const mergedRootStyles = Object.assign(styles.root, style);

    const wrappedChildren = React.Children.map(children, (currentChild) => {
      if (React.isValidElement(currentChild) && currentChild.type.muiName === 'Subheader') {
        return currentChild;
      }
      const childCols = 1;//currentChild.props.cols || 1;
      const childRows = 1;//currentChild.props.rows || 1;
      const itemStyle = Object.assign({}, styles.item, {
        //width: `${(100 / cols * childCols)}%`,
        width: tileSize + tilePadding,
        //height: cellHeight * childRows + padding,
        height: tileSize + tilePadding + tileTitleHieght,
      });

      return <div style={prepareStyles(itemStyle)}>{currentChild}</div>;
    });

    return (
      <div  style={prepareStyles(mergedRootStyles)} {...other}>
        {wrappedChildren}
      </div>
    );
  }
}

export default GridList;
