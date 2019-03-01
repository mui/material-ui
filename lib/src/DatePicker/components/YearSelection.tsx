import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import { DateType, DomainPropTypes } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import Year from './Year';

export interface YearSelectionProps extends WithUtilsProps, WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: MaterialUiPickersDate) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  animateYearScrolling?: boolean | null | undefined;
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export class YearSelection extends React.PureComponent<YearSelectionProps> {
  public static propTypes: any = {
    date: PropTypes.shape({}).isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    animateYearScrolling: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    animateYearScrolling: false,
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
  };

  public selectedYearRef?: React.ReactInstance = undefined;

  public getSelectedYearRef = (ref?: React.ReactInstance) => {
    this.selectedYearRef = ref;
  };

  public scrollToCurrentYear = (domNode: React.ReactInstance) => {
    const { animateYearScrolling } = this.props;
    const currentYearElement = findDOMNode(domNode) as Element;

    if (currentYearElement && currentYearElement.scrollIntoView) {
      if (animateYearScrolling) {
        setTimeout(() => currentYearElement.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        currentYearElement.scrollIntoView();
      }
    }
  };

  public componentDidMount() {
    if (this.selectedYearRef) {
      this.scrollToCurrentYear(this.selectedYearRef);
    }
  }

  public onYearSelect = (year: number) => {
    const { date, onChange, utils, onYearChange } = this.props;

    const newDate = utils.setYear(date, year);
    if (onYearChange) {
      onYearChange(newDate);
    }

    onChange(newDate);
  };

  public render() {
    const { minDate, maxDate, date, classes, disablePast, disableFuture, utils } = this.props;
    const currentYear = utils.getYear(date);

    return (
      <div className={classes.container}>
        {utils.getYearRange(minDate, maxDate).map(year => {
          const yearNumber = utils.getYear(year);
          const selected = yearNumber === currentYear;

          return (
            <Year
              key={utils.getYearText(year)}
              selected={selected}
              value={yearNumber}
              onSelect={this.onYearSelect}
              ref={selected ? this.getSelectedYearRef : undefined}
              disabled={
                (disablePast && utils.isBeforeYear(year, utils.date())) ||
                (disableFuture && utils.isAfterYear(year, utils.date()))
              }
            >
              {utils.getYearText(year)}
            </Year>
          );
        })}
      </div>
    );
  }
}

export const styles = createStyles({
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center',
  },
});

export default withStyles(styles, { name: 'MuiPickersYearSelection' })(withUtils()(YearSelection));
