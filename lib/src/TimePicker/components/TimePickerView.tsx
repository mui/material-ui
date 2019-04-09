import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import ClockType, { ClockTypeType } from '../../constants/ClockType';
import { MaterialUiPickersDate } from '../../typings/date';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';

export interface TimePickerViewProps extends WithUtilsProps {
  date: MaterialUiPickersDate;
  type: ClockTypeType;
  ampm?: boolean;
  minutesStep?: number;
  onHourChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  onMinutesChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  onSecondsChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export class TimePickerView extends React.PureComponent<TimePickerViewProps> {
  public static propTypes: any = {
    date: PropTypes.object.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinutesChange: PropTypes.func.isRequired,
    onSecondsChange: PropTypes.func.isRequired,
    ampm: PropTypes.bool,
    minutesStep: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(ClockType).map(key => ClockType[key])).isRequired,
  };

  public static defaultProps = {
    ampm: true,
    minutesStep: 1,
  };

  public getViewProps = () => {
    const { type, ampm, date, utils } = this.props;

    switch (type) {
      case ClockType.HOURS:
        return {
          value: utils.getHours(date),
          children: getHourNumbers({ date, ampm: Boolean(ampm), utils }),
          onChange: this.handleHourChange,
        };

      case ClockType.MINUTES:
        const minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({ value: minutesValue, utils }),
          onChange: this.handleMinutesChange,
        };

      case ClockType.SECONDS:
        const secondsValue = utils.getSeconds(date);
        return {
          value: secondsValue,
          children: getMinutesNumbers({ value: secondsValue, utils }),
          onChange: this.handleSecondsChange,
        };

      default:
        throw new Error('You must provide the type for TimePickerView');
    }
  };

  public handleHourChange = (hours: number, isFinish?: boolean) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setHours(date, hours);

    this.props.onHourChange(updatedTime, isFinish);
  };

  public handleMinutesChange = (minutes: number, isFinish?: boolean) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setMinutes(date, minutes);

    this.props.onMinutesChange(updatedTime, isFinish);
  };

  public handleSecondsChange = (seconds: number, isFinish?: boolean) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setSeconds(date, seconds);

    this.props.onSecondsChange(updatedTime, isFinish);
  };

  public render() {
    const { ampm, type, minutesStep } = this.props;
    const viewProps = this.getViewProps();

    return <Clock type={type} ampm={ampm} minutesStep={minutesStep} {...viewProps} />;
  }
}

export default withUtils()(TimePickerView);
