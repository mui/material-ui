import * as React from 'react';
import Button from '@material-ui/core/Button';

export default function App() {
  return (
    <div>
      <Button
        variant="contained"
        className="m-1 bg-warning-main hover:bg-warning-dark text-warning-contrastText"
      >
        Warning
      </Button>
      <Button
        variant="contained"
        className="m-1 bg-error-main hover:bg-error-dark text-error-contrastText"
      >
        Error
      </Button>
      <Button
        variant="contained"
        className="m-1 bg-success-main hover:bg-success-dark text-success-contrastText"
      >
        Success
      </Button>
      <Button
        variant="contained"
        className="m-1 sm:bg-success-main sm:hover:bg-success-dark sm:text-success-contrastText md:bg-error-main md:hover:bg-error-dark md:text-error-contrastText lg:bg-warning-main lg:hover:bg-warning-dark lg:text-warning-contrastText"
      >
        Media
      </Button>
    </div>
  );
}
