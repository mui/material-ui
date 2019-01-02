import { Omit } from '@material-ui/core';
import Popover, { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';
import DateTextField, { DateTextFieldProps } from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export interface OuterInlineWrapperProps extends Omit<DateTextFieldProps, 'utils' | 'onClick'> {
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** Dialog props passed to material-ui Dialog */
  PopoverProps?: Partial<PopoverPropsType>;
}

export interface InlineWrapperProps extends OuterInlineWrapperProps {
  handleAccept: () => void;
  isAccepted: boolean;
  /** Show only calendar for datepicker in popover mode */
  onlyCalendar: boolean;
}

export class InlineWrapper extends React.PureComponent<
  InlineWrapperProps & WithStyles<typeof styles>
> {
  public static propTypes: any = {
    onlyCalendar: PropTypes.bool,
    value: DomainPropTypes.date,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    format: PropTypes.string,
    PopoverProps: PropTypes.object,
    labelFunc: PropTypes.func,
    onClear: PropTypes.func,
    isAccepted: PropTypes.bool,
    handleAccept: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    keyboard: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    value: new Date(),
    labelFunc: undefined,
    onlyCalendar: false,
    format: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    PopoverProps: undefined,
    isAccepted: false,
    keyboard: undefined,
  };

  public static getDerivedStateFromProps(nextProps: InlineWrapperProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      if (nextProps.onClose) {
        nextProps.onClose();
      }

      return {
        anchorEl: null,
      };
    }

    return null;
  }

  public state = {
    anchorEl: null,
  };

  public open = (e: React.SyntheticEvent) => {
    this.setState({ anchorEl: e.currentTarget });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  public close = () => {
    this.setState({ anchorEl: null });

    if (this.props.value !== null) {
      this.props.handleAccept();
    }

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public handleKeyDown = (event: Event) => {
    switch (keycode(event)) {
      case 'enter': {
        this.props.handleAccept();
        this.close();
        break;
      }
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects
    event.preventDefault();
  };

  public render() {
    const {
      value,
      format,
      children,
      onOpen,
      onClose,
      PopoverProps,
      isAccepted,
      keyboard,
      onlyCalendar,
      classes,
      handleAccept,
      ...other
    } = this.props;

    const isOpen = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        {isOpen && <EventListener target="window" onKeyDown={this.handleKeyDown} />}

        <DateTextField
          value={value}
          format={format}
          onClick={this.open}
          keyboard={keyboard}
          {...other}
        />

        <Popover
          id="picker-popover"
          open={isOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.close}
          classes={{
            paper: classes.popoverPaper,
          }}
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
      </React.Fragment>
    );
  }
}

export const styles = {
  popoverPaper: {
    maxWidth: 310,
    minWidth: 300,
    paddingBottom: 8,
  },
};

export default withStyles(styles)(InlineWrapper);
