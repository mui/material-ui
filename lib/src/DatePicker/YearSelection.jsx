import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DomainPropTypes from '../constants/prop-types';
import withUtils from '../_shared/WithUtils';
import Year from './Year';

export class YearSelection extends PureComponent {
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
  }

  static defaultProps = {
    animateYearScrolling: false,
  }

  componentDidMount = () => {
    this.scrollToCurrentYear();
  }

  onYearSelect = (year) => {
    const { date, onChange, utils } = this.props;

    const newDate = utils.setYear(date, year);
    onChange(newDate);
  }

  getSelectedYearRef = (ref) => {
    this.selectedYearRef = ref;
  }

  scrollToCurrentYear = () => {
    const { animateYearScrolling } = this.props;
    const currentYearElement = findDOMNode(this.selectedYearRef);

    if (currentYearElement) {
      currentYearElement.scrollIntoView({
        behavior: animateYearScrolling ? 'smooth' : 'auto',
      });
    }
  }

  selectedYearRef = undefined;

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
                  selected={selected}
                  disabled={(
                    (disablePast && utils.isBeforeYear(year, utils.date())) ||
                    (disableFuture && utils.isAfterYear(year, utils.date()))
                  )}
                  value={yearNumber}
                  key={utils.getYearText(year)}
                  onSelect={this.onYearSelect}
                  ref={selected
                    ? this.getSelectedYearRef
                    : undefined
                  }
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

const styles = {
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center',
  },
};

export default withStyles(styles, { name: 'MuiPickersYearSelection' })(withUtils()(YearSelection));
