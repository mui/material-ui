import React, { useState } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { Button, withStyles } from '@material-ui/core';

function ControllingProgrammaticallyExample(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <div className={props.classes.container}>
      <Button onClick={() => setIsOpen(true)}> Open picker </Button>

      <div className="picker">
        <DatePicker
          variant="inline"
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          label="Open me from button"
          format="d MMM yyyy"
          value={selectedDate}
          onChange={handleDateChange}
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
