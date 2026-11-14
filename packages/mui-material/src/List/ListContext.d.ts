import * as React from 'react';

declare const ListContext: React.Context<{
  dense?: boolean | undefined;
  alignItems?: 'flex-start' | 'center' | undefined;
  disableGutters?: boolean | undefined;
}>;
export default ListContext;
