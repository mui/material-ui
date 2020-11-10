import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

const DateRangeDelimiter = styled(Typography)(
  {
    margin: '0 16px',
  },
  { name: 'MuiPickersDateRangeDelimiter' },
);

export type DateRangeDelimiterProps = React.ComponentProps<typeof DateRangeDelimiter>;

/**
 * TODO use Box
 * @ignore - internal component.
 */
export default DateRangeDelimiter;
