import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
const DatePickerExampleSimple = () => (
  <div>
    <DatePicker hintText="Portrait Dialog" />
    <DatePicker hintText="Landscape Dialog" mode="landscape" />
    <DatePicker hintText="Dialog Disabled" disabled={true} />
    <DatePicker hintText="Open to Year" openToYearSelection={true} />
    <DatePicker
      hintText="Month Picker"
      autoOk={true}
      disableTextEdit={false}
      disableDaySelection={true}
      openToYearSelection={true}
      formatDate={(date) => {
        const month = date.getMonth() + 1;
        return `${month.length === 1 ? '0' : ''}${month}/${date.getFullYear()}`;
      }}
      transformText={(newText, oldText) => {
        // Paste
        if (Math.abs(newText.length - oldText.length) > 1) return newText;

        // Delete
        if (oldText.length > newText.length) return newText;

        const newChar = newText[newText.length - 1];

        // Only digits allowed
        if (isNaN(newChar)) return oldText;

        // Simple masked input
        if (newText.length === 2) return `${newText}/`;

        // 7 characters max
        if (newText.length > 7) return oldText;

        return newText;
      }}
      parseText={(text) => {
        if (text.length < 7) return;

        const parts = text.split(('/'));

        if (isNaN(parts[0]) || isNaN(parts[1])) return;

        const month = parseInt(parts[0]);

        if (month > 12 || month < 1) return;

        const date = new Date();
        date.setDate(1);
        date.setMonth(month - 1);
        date.setFullYear(parts[1]);

        return date;
      }}
    />
  </div>
);

export default DatePickerExampleSimple;
