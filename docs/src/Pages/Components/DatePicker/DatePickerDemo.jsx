import React from 'react';
import PropTypesTable from '_shared/PropTypesTable';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const DatePickerDemo = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Date picker
    </Typography>
    <Typography variant="body1" gutterBottom>
      Date pickers use a dialog window to select a single date.
    </Typography>
    <Typography variant="body1">
      The selected day is indicated by a filled circle. The current day is indicated by a different
      color and type weight.
    </Typography>

    <SourcablePanel
      title="Basic usage"
      sourceFile="Components/DatePicker/BasicDatePicker.example.jsx"
    />

    <SourcablePanel
      title="Year/Month only Picker"
      sourceFile="Components/DatePicker/YearMonthPicker.example.jsx"
    />

    <SourcablePanel
      title="Keyboard input"
      sourceFile="Components/DatePicker/KeyboardDatePicker.example.jsx"
    />

    <SourcablePanel
      title="Inline mode"
      sourceFile="Components/DatePicker/InlineDatePicker.example.jsx"
    />

    <SourcablePanel
      title="Custom day element"
      sourceFile="Components/DatePicker/CustomElementsDatePicker.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Customization performing by overriding render method for Day component.
          <a href="https://codesandbox.io/s/mozqv539lp"> Here </a> example with moment-js
        </Typography>
      }
    />

    <PropTypesTable src="DatePicker/DatePickerModal.tsx" />
  </div>
);

export default DatePickerDemo;
