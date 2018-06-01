import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import setDisplayName from 'recompose/setDisplayName';
import withHandlers from 'recompose/withHandlers';
import withRenderProps from 'recompose/withRenderProps';
import withState from 'recompose/withState';

const getValidDateOrCurrent = ({ utils, value }) => {
  const date = utils.date(value);

  return utils.isValid(date) && value !== null ? date : utils.date();
};

const BasePickerHoc = compose(
  setDisplayName('BasePicker'),
  withState('date', 'changeDate', getValidDateOrCurrent),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.props.changeDate(getValidDateOrCurrent(this.props));
      }
    },
  }),
  withHandlers({
    getFormat: ({ format, labelFunc, ampm }) => () => {
      if (format || labelFunc) {
        return format;
      }

      return ampm
        ? this.default12hFormat
        : this.default24hFormat;
    },
    handleTextFieldChange: ({ changeDate, onChange }) => (date) => {
      if (date === null) {
        this.handleClear();
      } else {
        changeDate(date, () => onChange(date));
      }
    },
    handleChange: ({
      changeDate, onChange, autoOk, date,
    }) => (newDate, isFinish = true) => {
      changeDate(newDate, () => {
        if (isFinish && autoOk) {
          onChange(date);
        }
      });
    },
    handleClear: ({ onChange }) => () => onChange(null),
    handleAccept: ({ onChange, date }) => () => onChange(date),
    handleSetTodayDate: ({ changeDate, utils }) => () => changeDate(utils.date()),
  }),
);

export default withRenderProps(BasePickerHoc);

