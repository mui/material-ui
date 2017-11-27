import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui';

import Calendar from './Calendar';
import YearSelection from './YearSelection';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import * as defaultUtils from '../utils/utils';
import DomainPropTypes from '../constants/prop-types';

export class DatePicker extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
    children: PropTypes.node,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    animateYearScrolling: undefined,
    openToYearSelection: false,
    children: null,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
  }

  state = {
    showYearSelection: this.props.openToYearSelection,
  }

  get date() {
    return this.props.date.startOf('day');
  }

  get minDate() {
    return moment(this.props.minDate);
  }

  get maxDate() {
    return moment(this.props.maxDate);
  }

  handleYearSelect = (date) => {
    this.props.onChange(date, false);
    this.openCalendar();
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }


  render() {
    const {
      classes,
      disableFuture,
      onChange,
      animateYearScrolling,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      utils,
    } = this.props;
    const { showYearSelection } = this.state;

    return (
      <div className={classes.container}>
        <PickerToolbar>
          <ToolbarButton
            type="subheading"
            onClick={this.openYearSelection}
            selected={showYearSelection}
            label={utils.getYearText(this.date)}
          />

          <ToolbarButton
            type="display1"
            onClick={this.openCalendar}
            selected={!showYearSelection}
            label={utils.getDatePickerHeaderText(this.date)}
          />
        </PickerToolbar>

        { this.props.children }

        {
          showYearSelection
            ?
              <YearSelection
                date={this.date}
                onChange={this.handleYearSelect}
                minDate={this.minDate}
                maxDate={this.maxDate}
                disableFuture={disableFuture}
                animateYearScrolling={animateYearScrolling}
                utils={utils}
              />
            :
              <Calendar
                date={this.date}
                onChange={onChange}
                disableFuture={disableFuture}
                minDate={this.minDate}
                maxDate={this.maxDate}
                leftArrowIcon={leftArrowIcon}
                rightArrowIcon={rightArrowIcon}
                renderDay={renderDay}
                utils={utils}
              />
        }
      </div>
    );
  }
}

const styles = () => ({

});

export default withStyles(styles, { name: 'MuiPickersDatePicker' })(DatePicker);

