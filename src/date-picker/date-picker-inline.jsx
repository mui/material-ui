import React, {PropTypes} from 'react';
import Popover from '../popover/popover';
import PopoverAnimationFromTop from '../popover/popover-animation-from-top';

const styles = {
  actions: {
    marginRight: 8,
    paddingBottom: 12,
    textAlign: 'right',
  },
};

class DatePickerInline extends React.Component {
  static propTypes = {
    actions: PropTypes.node,
    children: PropTypes.node,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    anchorEl: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({
        anchorEl: this.refs.root,
      });
    }
  }

  render() {
    const {
      actions,
      children,
      style,
      onRequestClose,
      open,
      ...other,
    } = this.props;

    const {
      anchorEl,
    } = this.state;

    return (
      <div {...other} ref="root" style={style}>
        <Popover
          onRequestClose={onRequestClose}
          open={open}
          anchorEl={anchorEl}
          animation={PopoverAnimationFromTop}
        >
          {children}
          <div style={styles.actions}>
            {actions}
          </div>
        </Popover>
      </div>
    );
  }
}

export default DatePickerInline;
