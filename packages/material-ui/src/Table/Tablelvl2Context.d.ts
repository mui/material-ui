import { Context } from 'react';

interface Tablelvl2ContextProps {
  variant: 'head' | 'body' | 'footer';
}

declare const Tablelvl2Context: Context<Tablelvl2ContextProps | undefined>;

export default Tablelvl2Context;
