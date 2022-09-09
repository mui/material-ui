---
product: material-ui
title: Backdrop React Component
components: Backdrop
githubLabel: 'component: backdrop'
---

# Backdrop

<p class="description">The backdrop component is used to provide emphasis on a particular element or parts of it.</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more.
In its simplest form, the backdrop component will add a dimmed layer over your application.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Example

{{"demo": "SimpleBackdrop.js"}}


```
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
```
