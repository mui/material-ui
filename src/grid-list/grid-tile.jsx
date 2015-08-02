let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');

let AutoPrefix = require('../styles/auto-prefix');

let GridTile = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.node,
    titlePosition: React.PropTypes.oneOf(['top', 'bottom']),
    titleBackground: React.PropTypes.string,
    actionIcon: React.PropTypes.element,
    actionPosition: React.PropTypes.oneOf(['left', 'right']),
    rootClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getDefaultProps() {
    return {
      titlePosition: 'bottom',
      actionPosition: 'right',
      titleBackground: 'rgba(0, 0, 0, 0.4)',
      rootClass: 'div',
    };
  },

  getStyles()
  {
    let spacing = this.context.muiTheme.spacing;
    let themeVariables = this.context.muiTheme.component.gridTile;
    let actionPos = this.props.actionIcon ? this.props.actionPosition : null;
    let gutterLess = spacing.desktopGutterLess;

    let styles = {
      root: {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
      },
      titleBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.titlePosition]: 0,
        height: this.props.subtitle ? 68 : 48,
        background: this.props.titleBackground,
        display: 'flex',
        alignItems: 'center',
      },
      titleWrap: {
        flexGrow: 1,
        marginLeft: actionPos === 'right' ? gutterLess : 0,
        marginRight: actionPos === 'left' ? gutterLess : 0,
        color: themeVariables.textColor,
        overflow: 'hidden',
      },
      title: {
        fontSize: '16px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      subtitle: {
        fontSize: '12px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      actionIcon: {
        order: actionPos === 'left' ? -1 : 1,
      },
      childImg: {
        height: '100%',
        transform: 'translateX(-50%)',
        position: 'relative',
        left: '50%',
      },
    };
    styles.titleBar = AutoPrefix.all(styles.titleBar);
    styles.titleWrap = AutoPrefix.all(styles.titleWrap);
    styles.actionIcon = AutoPrefix.all(styles.actionIcon);
    return styles;
  },

  componentDidMount() {
    this._ensureImageCover();
  },

  componeneDidUpdate() {
    this._ensureImageCover();
  },

  _ensureImageCover() {
    let imgEl = React.findDOMNode(this.refs.img);

    if (imgEl) {
      let fit = () => {
        if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
          imgEl.style.height = 'auto';
          imgEl.style.left = '0';
          imgEl.style.width = '100%';
          imgEl.style.top = '50%';
          imgEl.style.transform = imgEl.style.WebkitTransform = 'translateY(-50%)';
        }
        imgEl.removeEventListener('load', fit);
        imgEl = null; // prevent closure memory leak
      };
      if (imgEl.complete) {
        fit();
      } else {
        imgEl.addEventListener('load', fit);
      }
    }
  },


  render() {
    let {
      title,
      subtitle,
      titlePosition,
      titleBackground,
      actionIcon,
      actionPosition,
      style,
      children,
      rootClass,
      ...other,
      } = this.props;

    let styles = this.getStyles();

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    let titleBar = null;

    if (title) {
      titleBar = (
        <div style={styles.titleBar}>
          <div style={styles.titleWrap}>
            <div style={styles.title}>{title}</div>
            {
              subtitle ? (<div style={styles.subtitle}>{subtitle}</div>) : null
            }
          </div>
          {
            actionIcon ? (<div style={styles.actionIcon}>{actionIcon}</div>) : null
          }
        </div>
      );
    }

    // if there is an image passed as children
    // clone it an put our styles
    if (React.Children.count(children) === 1) {
      children = React.Children.map(children, (child) => {
        if (child.type === 'img') {
          return React.cloneElement(child, {
            ref: 'img',
            style: this.mergeStyles(styles.childImg, child.props.style),
          });
        } else {
          return child;
        }
      });
    }

    let RootTag = rootClass;
    return (
      <RootTag style={mergedRootStyles} {...other}>
        {children}
        {titleBar}
      </RootTag>
    );
  },
});

module.exports = GridTile;
