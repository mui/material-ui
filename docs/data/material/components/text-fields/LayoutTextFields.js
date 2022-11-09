import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 0, 0, 0.1)"
            : "rgb(255 132 132 / 25%)",
      }}
    />
  );
}

export default function LayoutTextFields() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { width: "25ch" },
      }}
    >
      <RedBar />
      <TextField
        label={'margin="none"'}
        id="margin-none"
        value={value}
        onChange={handleChange}
      />
      <RedBar />
      <TextField
        label={'margin="dense"'}
        id="margin-dense"
        margin="dense"
        value={value}
        onChange={handleChange}
      />
      <RedBar />
      <TextField
        label={'margin="normal"'}
        id="margin-normal"
        margin="normal"
        value={value}
        onChange={handleChange}
      />
      <RedBar />
    </Box>
  );
}
