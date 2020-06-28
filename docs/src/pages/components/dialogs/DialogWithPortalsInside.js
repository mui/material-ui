import React from "react";
import { Button, Dialog, TextField, Popper } from "@material-ui/core";

function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [buttonRef, setButtonRef] = React.useState(null);

  const [secondPopperOpen, setSecondPopperOpen] = React.useState(false);
  const [secondButtonRef, setSecondButtonRef] = React.useState(null);

  return (
    <div className="App">
      <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Button
          ref={ref => setButtonRef(ref)}
          onClick={() => setPopperOpen(!popperOpen)}
        >
          Open popper
        </Button>

        <Popper open={popperOpen} anchorEl={buttonRef} style={{zIndex: 2000}}>
          <Button
            ref={ref => setSecondButtonRef(ref)}
            onClick={() => { setSecondPopperOpen(!secondPopperOpen)}}
            onMouseUp={() => {console.log("Second button clicked")}}
          >
            Open popper
          </Button>
          <TextField
            autoFocus
            onFocus={() => console.log("TextField focus")}
            onBlur={() => console.log("TextField blur")}
          />
          <Popper open={secondPopperOpen} anchorEl={secondButtonRef} style={{zIndex: 2001}}>
            <TextField
              autoFocus
              onFocus={() => console.log("second TextField focus")}
              onBlur={() => console.log("second TextField blur")}
            />
          </Popper>
        </Popper>
      </Dialog>
    </div>
  );
}

export default App;
