import React, { Fragment, useState } from 'react';
import { DatePicker } from 'material-ui-pickers';

function YearMonthPicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <DatePicker
          views={['year']}
          label="Year only"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling
        />
      </div>

      <div className="picker">
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          helperText="With min and max"
          minDate={new Date('2018-03-01')}
          maxDate={new Date('2018-06-01')}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <DatePicker
          views={['year', 'month']}
          openTo="year"
          label="Year and Month"
          helperText="Start from year selection"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </Fragment>
  );
}

export default YearMonthPicker;
