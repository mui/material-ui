import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class InlineWrapper extends PureComponent {
  static propTypes = {
    /** Show only calendar for datepicker in popover mode */
    onlyCalendar: PropTypes.bool,
    /** Picker value */
    value: DomainPropTypes.date,
    /** "OK" label message */
    okLabel: PropTypes.node,
    /** "Cancel" label message */
    cancelLabel: PropTypes.node,
    /** "Clear" label message */
    clearLabel: PropTypes.node,
    /** If true clear button will be displayed */
    clearable: PropTypes.bool,
    /** "Today" label message */
    todayLabel: PropTypes.string,
    /**
     * If true today button will be displayed
     * <b>Note*</b> that clear button has higher priority
    */
    showTodayButton: PropTypes.bool,
    /** On open callback [(e: Event) => void] */
    onOpen: PropTypes.func,
    /** On close callback [(e: Event) => void] */
    onClose: PropTypes.func,
    /** Format string */
    format: PropTypes.string,
    /** Dialog props passed to material-ui Dialog */
    PopoverProps: PropTypes.object,
    labelFunc: PropTypes.func,
    onClear: PropTypes.func,
    isAccepted: PropTypes.bool,
    children: PropTypes.node.isRequired,
    keyboard: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    labelFunc: undefined,
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    todayLabel: 'Today',
    clearable: false,
    onlyCalendar: false,
    showTodayButton: false,
    format: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    PopoverProps: undefined,
    isAccepted: false,
    keyboard: undefined,
  }

  state = {
    anchorEl: null,
  }

  static getDerivedStateFromProps(nextProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      return {
        anchorEl: null,
      };
    }

    return null;
  }

  open = (e) => {
    this.setState({ anchorEl: e.currentTarget });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  close = () => {
    this.setState({ anchorEl: null });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const {
      value,
      format,
      children,
      okLabel,
      cancelLabel,
      clearLabel,
      todayLabel,
      showTodayButton,
      onOpen,
      onClose,
      PopoverProps,
      isAccepted,
      keyboard,
      onlyCalendar,
      ...other
    } = this.props;

    return (
      <Fragment>
        <DateTextField
          value={value}
          format={format}
          onClick={this.open}
          keyboard={keyboard}
          {...other}
        />

        <Popover
          id="picker-popover"
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.close}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: keyboard ? 'right' : 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: keyboard ? 'right' : 'center',
          }}
          children={children}
          {...PopoverProps}
        />
      </Fragment>
    );
  }
}
