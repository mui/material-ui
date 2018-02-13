import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DomainPropTypes from '../constants/prop-types';
import defaultUtils from '../utils/utils';

/* eslint-disable react/sort-comp */
export default class PickerBase extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    returnMoment: PropTypes.bool,
    format: PropTypes.string,
    labelFunc: PropTypes.func,
    ampm: PropTypes.bool,
    utils: PropTypes.func,
  }

  static defaultProps = {
    value: new Date(),
    autoOk: false,
    returnMoment: false,
    labelFunc: undefined,
    format: undefined,
    ampm: true,
    utils: defaultUtils,
  }

  getValidDateOrCurrent = () => {
    const { utils, value } = this.props;
    console.log(this.props.utils);
    const date = utils.date(value);

    return utils.isValid(date) ? date : utils.date();
  }

  state = {
    date: this.getValidDateOrCurrent(),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ date: this.getValidDateOrCurrent(nextProps) });
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
    const dateToReturn = this.props.returnMoment
      ? this.state.date
      : this.props.utils.toNativeDate(this.state.date);

    this.props.onChange(dateToReturn);
  }

  handleDismiss = () => {
    this.setState({ date: this.getValidDateOrCurrent(this.props) });
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
}
