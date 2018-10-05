import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import DomainPropTypes, { DateType } from '../../constants/prop-types';
import withUtils, { WithUtilsProps } from '../../_shared/WithUtils';
import Year from './Year';
import { MaterialUiPickersDate } from '../../typings/date';

export interface YearSelectionProps extends WithUtilsProps, WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: MaterialUiPickersDate) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  animateYearScrolling?: boolean;
}

export class YearSelection extends React.PureComponent<YearSelectionProps> {
  static propTypes = {
    date: PropTypes.shape({}).isRequired,
    minDate: DomainPropTypes.date.isRequired,
    maxDate: DomainPropTypes.date.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool.isRequired,
    disableFuture: PropTypes.bool.isRequired,
    animateYearScrolling: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    innerRef: PropTypes.any,
  }

  static defaultProps = {
    animateYearScrolling: false,
  }

  selectedYearRef?: React.ReactInstance = undefined;

  getSelectedYearRef = (ref?: React.ReactInstance) => {
    this.selectedYearRef = ref;
  }

  scrollToCurrentYear = (domNode: React.ReactInstance) => {
    const { animateYearScrolling } = this.props;
    const currentYearElement = findDOMNode(domNode) as Element;

    if (currentYearElement && currentYearElement.scrollIntoView) {
      if (animateYearScrolling) {
        setTimeout(() => currentYearElement.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        currentYearElement.scrollIntoView();
      }
    }
  }

  componentDidMount = () => {
    if (this.selectedYearRef) {
      this.scrollToCurrentYear(this.selectedYearRef);
    }
  }

  onYearSelect = (year: number) => {
    const { date, onChange, utils } = this.props;

    const newDate = utils.setYear(date, year);
    onChange(newDate);
  }

  render() {
    const {
      minDate, maxDate, date, classes, disablePast, disableFuture, utils,
    } = this.props;
    const currentYear = utils.getYear(date);

    return (
      <div className={classes.container}>
        {
          utils.getYearRange(minDate, maxDate)
            .map((year) => {
              const yearNumber = utils.getYear(year);
              const selected = yearNumber === currentYear;

              return (
                <Year
                  key={utils.getYearText(year)}
                  selected={selected}
                  value={yearNumber}
                  onSelect={this.onYearSelect}
                  // @ts-ignore
                  ref={selected ? this.getSelectedYearRef : undefined}
                  disabled={(
                    (disablePast && utils.isBeforeYear(year, utils.date()))
                    || (disableFuture && utils.isAfterYear(year, utils.date()))
                  )}
                >
                  {utils.getYearText(year)}
                </Year>
              );
            })
        }
      </div>
    );
  }
}

const styles = createStyles({
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center',
  },
})

export default withStyles(styles, { name: 'MuiPickersYearSelection' })(
  withUtils()(YearSelection as React.ComponentType<YearSelectionProps>)
);
