import PropTypes from 'prop-types';
import React, { PureComponent, useState, useCallback, useRef } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { InlineDatePicker } from 'material-ui-pickers';

function ControllingProgrammaticallyExample(props) {
  const pickerRef = useRef(null);
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  const openPicker = useCallback(
    e => {
      if (pickerRef.current) {
        pickerRef.current.open(e);
      }
    },
    [pickerRef.current]
  );

  return (
    <div className={props.classes.container}>
      <Button onClick={openPicker}> Open picker </Button>

      <div className="picker">
        <InlineDatePicker
          clearable
          label="Open me from button"
          format="d MMM yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          ref={pickerRef}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(ControllingProgrammaticallyExample);
