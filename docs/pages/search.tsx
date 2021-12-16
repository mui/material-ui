import { DeferredAppSearch } from 'docs/src/modules/components/AppFrame';
import * as React from 'react';
import Home from '.';

export default function Search() {
  return (
    <React.Fragment>
      <Home />
      <DeferredAppSearch initialQuery={'asdf'} isOpen />
      {/* <AppSearch initialQuery={'asdf'} isOpen /> */}
    </React.Fragment>
  );
}
