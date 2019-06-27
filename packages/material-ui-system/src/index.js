
import * as displayStyles from './display';	
import compose from './compose';	

export { default as breakpoints } from './breakpoints';
	
export { default as css } from './css';	

export { compose };

export const displayRaw = displayStyles.displayRaw.styleFunction;
export const displayPrint = displayStyles.displayPrint.styleFunction;
export const display = compose(
  displayRaw,
  displayPrint
);
