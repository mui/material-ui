import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DomainPropTypes from '../constants/prop-types';

/* eslint-disable react/require-default-props */
export default class PickerBase extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    format: PropTypes.string,
    labelFunc: PropTypes.func,
    ampm: PropTypes.bool,
    utils: PropTypes.object.isRequired,
  }

  static getValidDateOrCurrent = (props) => {
    const { utils, value } = props;
    const date = utils.date(value);

    return utils.isValid(date) && value !== null ? date : utils.date();
  }

  state = {
    date: PickerBase.getValidDateOrCurrent(this.props),
  }

  componentDidUpdate(prevProps) {
    if (!this.props.utils.isEqual(prevProps.value, this.props.value)) {
      this.setState({
        date: PickerBase.getValidDateOrCurrent(this.props),
      });
    }
  }

  getFormat = () => {
    if (this.props.format || this.props.labelFunc) {
      return this.props.format;
    }

    return this.props.ampm
      ? this.default12hFormat
      : this.default24hFormat;
  }

  getRef = (node) => { this.wrapper = node; }

  handleClear = () => {
    this.props.onChange(null);
  }

  handleAccept = () => {
    this.props.onChange(this.state.date);
  }

  handleDismiss = () => {
    this.setState({ date: PickerBase.getValidDateOrCurrent(this.props) });
  }

  handleChange = (date, isFinish = true) => {
    this.setState({ date }, () => {
      if (isFinish && this.props.autoOk) {
        this.handleAccept();
        this.wrapper.close();
      }
    });
  }

  handleTextFieldChange = (date) => {
    if (date === null) {
      this.handleClear();
    } else {
      this.setState({ date }, this.handleAccept);
    }
  }

  handleSetTodayDate = () => {
    this.handleChange(this.props.utils.date());
  }
}
