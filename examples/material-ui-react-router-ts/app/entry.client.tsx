import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

React.startTransition(() => {
  ReactDOM.hydrateRoot(
    document,
    <React.StrictMode>
      <HydratedRouter />
    </React.StrictMode>,
  );
});
