import React, {Component, PropTypes, Children, isValidElement} from 'react';
import propTypes from '../utils/propTypes';
import Subheader from '../Subheader';
import deprecated from '../utils/deprecatedPropType';
import warning from 'warning';

class List extends Component {
  static propTypes = {
    /**
     * These are usually `ListItem`s that are passed to
     * be part of the list.
     */
    children: PropTypes.node,
    /**
     * If true, the subheader will be indented by 72px.
     */
    insetSubheader: deprecated(PropTypes.bool,
      'Refer to the `subheader` property. It will be removed with v0.16.0.'),
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The subheader string that will be displayed at the top of the list.
     */
    subheader: deprecated(PropTypes.node,
      'Instead, nest the `Subheader` component directly inside the `List`. It will be removed with v0.16.0.'),
    /**
     * Override the inline-styles of the subheader element.
     */
    subheaderStyle: deprecated(PropTypes.object,
      'Refer to the `subheader` property. It will be removed with v0.16.0.'),
    /**
     * @ignore
     * ** Breaking change ** List no longer supports `zDepth`. Instead, wrap it in `Paper`
     * or another component that provides zDepth.
     */
    zDepth: propTypes.zDepth,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      insetSubheader = false,
      style,
      subheader,
      subheaderStyle,
      zDepth,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    warning((typeof zDepth === 'undefined'), 'List no longer supports `zDepth`. Instead, wrap it in `Paper` ' +
      'or another component that provides zDepth. It will be removed with v0.16.0.');

    let hasSubheader = false;

    if (subheader) {
      hasSubheader = true;
    } else {
      const firstChild = Children.toArray(children)[0];
      if (isValidElement(firstChild) && firstChild.type === Subheader) {
        hasSubheader = true;
      }
    }

    const styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: hasSubheader ? 0 : 8,
      },
    };

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {subheader && (
          <Subheader inset={insetSubheader} style={subheaderStyle}>
            {subheader}
          </Subheader>
        )}
        {children}
      </div>
    );
  }
}

export default List;
