import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import setDisplayName from 'recompose/setDisplayName';
import withHandlers from 'recompose/withHandlers';
import withRenderProps from 'recompose/withRenderProps';
import withState from 'recompose/withState';

import withUtils from '../_shared/WithUtils';

const getValidDateOrCurrent = ({ utils, value }) => {
  const date = utils.date(value);

  return utils.isValid(date) && value !== null ? date : utils.date();
};

export const BasePickerHoc = compose(
  withUtils(),
  setDisplayName('BasePicker'),
  withState('date', 'changeDate', getValidDateOrCurrent),
  withState('isAccepted', 'handleAcceptedChange', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.props.changeDate(getValidDateOrCurrent(this.props));
      }
    },
  }),
  withHandlers({
    handleClear: ({ onChange }) => () => onChange(null),
    handleAccept: ({ onChange, date }) => () => onChange(date),
    handleSetTodayDate: ({ changeDate, utils }) => () => changeDate(utils.date()),
    handleTextFieldChange: ({ changeDate, onChange }) => (date) => {
      if (date === null) {
        onChange(null);
      } else {
        changeDate(date, () => onChange(date));
      }
    },
    pick12hOr24hFormat: ({ format, labelFunc, ampm }) => (default12hFormat, default24hFormat) => {
      if (format || labelFunc) {
        return format;
      }

      return ampm ? default12hFormat : default24hFormat;
    },
    handleChange: ({
      autoOk,
      changeDate,
      onChange,
      handleAcceptedChange,
    }) => (newDate, isFinish = true) => {
      changeDate(newDate, () => {
        if (isFinish && autoOk) {
          onChange(newDate);
          // pass down accept true, and make it false in the next tick
          handleAcceptedChange(true, () => handleAcceptedChange(false));
        }
      });
    },
  }),
);

export default withRenderProps(BasePickerHoc);

