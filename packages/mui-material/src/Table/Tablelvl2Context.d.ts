import * as React from 'react';

interface Tablelvl2ContextProps {
  variant: 'head' | 'body' | 'footer';
}

declare const Tablelvl2Context: React.Context<Tablelvl2ContextProps | undefined>;

export default Tablelvl2Context;
