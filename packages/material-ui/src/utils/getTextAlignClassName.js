import { capitalize } from './helpers';

export const textAlignClasses = {
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: 'left',
  },
  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: 'center',
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
  },
  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: 'justify',
  },
  /* Styles applied to the root element if `align="nowrap"`. */
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const getTextAlignClassName = (classes, align) => {
  return { [classes[`align${capitalize(align)}`]]: align !== 'inherit' };
};

export default getTextAlignClassName;
