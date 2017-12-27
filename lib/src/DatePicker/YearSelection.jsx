import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import classnames from 'classnames';
import { extendMoment } from 'moment-range';
import { withStyles, Typography } from 'material-ui';
import DomainPropTypes from '../constants/prop-types';
import * as defaultUtils from '../utils/utils';

const moment = extendMoment(Moment);

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
    utils: PropTypes.object,
  }

  static defaultProps = {
    animateYearScrolling: false,
    utils: defaultUtils,
  }

  componentDidMount = () => {
    this.scrollToCurrentYear();
  }

  onYearSelect = (year) => {
    const { date, onChange, utils } = this.props;

    const newDate = utils.setYear(date, year);
    onChange(newDate);
  }

  scrollToCurrentYear = () => {
    const { animateYearScrolling, classes } = this.props;
    const currentYearElement = document.getElementsByClassName(classes.selectedYear)[0];

    if (currentYearElement) {
      currentYearElement.scrollIntoView({
        behavior: animateYearScrolling ? 'smooth' : 'auto',
      });
    }
  }

  render() {
    const {
      minDate, maxDate, date, classes, disablePast, disableFuture, utils,
    } = this.props;
    const currentYear = utils.getYear(date);

    return (
      <div className={classes.container}>
        {
          Array.from(moment.range(minDate, maxDate).by('year'))
            .map((year) => {
              const yearNumber = utils.getYear(year);
              const isSelected = yearNumber === currentYear;
              const className = classnames(classes.year, {
                [classes.selectedYear]: isSelected,
                [classes.disabled]: (
                  (disablePast && year.isBefore(moment(), 'year')) ||
                  (disableFuture && year.isAfter(moment(), 'year'))
                ),
              });

              return (
                <Typography
                  role="button"
                  component="div"
                  key={utils.getYearText(year)}
                  className={className}
                  tabIndex={0}
                  onClick={() => this.onYearSelect(yearNumber)}
                  onKeyPress={() => this.onYearSelect(yearNumber)}
                  color={isSelected ? 'primary' : 'default'}
                  type={isSelected ? 'headline' : 'subheading'}
                >
                  {utils.getYearText(year)}
                </Typography>
              );
            })
        }
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center',
  },
  year: {
    height: theme.spacing.unit * 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    '&:focus': {
      color: theme.palette.primary[500],
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selectedYear: {
    margin: '10px 0',
    fontWeight: theme.typography.fontWeightMedium,
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
});

export default withStyles(styles, { name: 'MuiPickersYearSelection' })(YearSelection);
