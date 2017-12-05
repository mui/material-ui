import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DomainPropTypes from '../constants/prop-types';

export default class PickerBase extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    returnMoment: PropTypes.bool,
    format: PropTypes.string,
    labelFunc: PropTypes.func,
    ampm: PropTypes.bool,
    keyboard: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    autoOk: false,
    returnMoment: false,
    labelFunc: undefined,
    format: undefined,
    ampm: true,
    keyboard: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      date: this.getValidDateOrCurrent(props),
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.value !== nextProps.value) {
      this.setState({ date: this.getValidDateOrCurrent(nextProps) });
    }
  }

  getValidDateOrCurrent = ({ value }) => {
    const date = moment(value);

    return date.isValid() ? date : moment();
  }

  getFormat = () => {
    if (this.props.format || this.props.labelFunc) {
      return this.props.format;
    }

    return this.props.ampm
      ? this.default12hFormat
      : this.default24hFormat;
  }

  togglePicker = () => {
    this.wrapper.togglePicker();
  }

  handleAccept = () => {
    const dateToReturn = this.props.returnMoment
      ? this.state.date
      : this.state.date.toDate();

    this.props.onChange(dateToReturn);
  }

  handleDismiss = () => {
    this.setState({ date: this.getValidDateOrCurrent(this.props) });
  }

  handleChange = (date, isFinish = true) => {
    this.setState({ date }, () => {
      if (isFinish && (this.props.autoOk || this.props.keyboard)) {
        this.handleAccept();
      }

      if (isFinish && this.props.autoOk) {
        this.togglePicker();
      }
    });
  }
}
