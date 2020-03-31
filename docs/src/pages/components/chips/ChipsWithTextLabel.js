import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField"

export default function Demo() {
  const [value, setValue] = useState("foo");

  const handleChange = event => {
    console.log('handle change in Demo------------', event)
    setValue(event.target.value);
  };

  const label = <TextField value={value} onChange={handleChange} />;

  return (
    <div className="App">
      <h2>Text cannot be removed with backspace or delete.</h2>
      <p>However, you can add new text.</p>
      <Chip label={label} />
    </div>
  );
}