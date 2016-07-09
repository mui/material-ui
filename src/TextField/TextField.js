import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import {createChainedFunction} from '../utils/helpers';

export const styleSheet = createStyleSheet('TextField', () => {
  return {
    root: {
      position: 'relative',
    },
  };
});

/**
 * TextField
 *
 * @see https://material.google.com/components/text-fields.html
 *
 * ```js
 * import TextField from 'material-ui/TextField';
 *
 * const Component = () => <TextField value="Hello World">;
 * ```
 */
export default class TextField extends Component {
  static propTypes = {
    /**
     * The contents of the `TextField`
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    dirty: false,
    focused: false,
  };

  handleFocus = () => this.setState({focused: true});
  handleBlur = () => this.setState({focused: false});

  renderChild = (child) => {
    const {muiName} = child.type;

    if (muiName === 'TextFieldInput') {
      return React.cloneElement(child, {
        onFocus: createChainedFunction(this.handleFocus, child.onFocus),
        onBlur: createChainedFunction(this.handleBlur, child.onBlur),
      });
    }

    return child;
  }

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [this.classes.root]: true,
    }, className);

    console.log(this.state);

    return (
      <div className={classNames} {...other}>
        {React.Children.map(children, this.renderChild)}
        <div style={{width: 150, marginLeft: 10}}>
          <small>
            Focused: {this.state.focused ? 'true' : 'false'}<br />
            Dirty: {this.state.dirty ? 'true' : 'false'}<br />
          </small>
        </div>
      </div>
    );
  }
}
