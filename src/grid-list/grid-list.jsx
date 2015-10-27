const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const GridList = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    cols: React.PropTypes.number,
    padding: React.PropTypes.number,
    cellHeight: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      cellHeight: 180,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles()
  {
    return {
      root: {
        display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
        flexWrap: 'wrap',
        margin: `-${this.props.padding/2}px`,
      },
      item: {
        boxSizing: 'border-box',
        padding: `${this.props.padding/2}px`,
      },
    };
  },


  render() {
    const {
      cols,
      padding,
      cellHeight,
      children,
      style,
      ...other,
      } = this.props;

    const styles = this.getStyles();

    const mergedRootStyles = this.mergeStyles(styles.root, style);

    const wrappedChildren = React.Children.map(children, (currentChild) => {
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;
      const itemStyle = this.mergeStyles(styles.item, {
        width: (100 / cols * childCols) + '%',
        height: cellHeight * childRows + padding,
      });

      return <div style={this.prepareStyles(itemStyle)}>{currentChild}</div>;
    });

    return (
      <div style={this.prepareStyles(mergedRootStyles)} {...other}>{wrappedChildren}</div>
    );
  },
});

module.exports = GridList;
