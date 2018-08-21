import React from 'react';
import { Typography } from '@material-ui/core';

const ParsingDates = () => (
  <div>
    <Typography variant="display2" gutterBottom> Parsing dates </Typography>

    <Typography gutterBottom>
      Material-UI pickers rely on the date management library when the date should be parsed.
      For any prop-types, that accept actually the date
      (e.g. <span className="inline-code">minDate</span>, <span className="inline-code">maxDate</span>)
      accept string, number, Date object and so on.
    </Typography>

    <Typography>
      Find more information about parsing dates in docs for your library:
    </Typography>

    <ul>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Several_ways_to_create_a_Date_object">
          date-fns
        </a>
      </li>
      <li>
        <a href="https://moment.github.io/luxon/docs/manual/parsing.html">
          luxon
        </a>
      </li>
      <li>
        <a href="https://momentjs.com/docs/#/parsing/">
          moment
        </a>
      </li>
    </ul>

    <Typography gutterBottom>
      Pass any value to the picker, and if it won`t be parsed as expected feel free
      to open issue on our <a href="https://github.com/dmtrKovalenko/material-ui-pickers"> github </a>
      😎
    </Typography>
  </div>
);

export default ParsingDates;
