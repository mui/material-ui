import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { withDefaultProps } from '../_shared/withDefaultProps';

export const DateRangeDelimiter = withDefaultProps(
  { name: 'MuiPickersDateRangeDelimiter' },
  styled(Typography)({
    margin: '0 16px',
  })
);

export type DateRangeDelimiterProps = React.ComponentProps<typeof DateRangeDelimiter>;
