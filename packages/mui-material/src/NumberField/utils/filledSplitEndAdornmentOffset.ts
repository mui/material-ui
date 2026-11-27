import inputAdornmentClasses from '../../InputAdornment/inputAdornmentClasses';

// Match the top margin that InputAdornment applies on the start side of a filled input.
const filledSplitEndAdornmentOffset = {
  props: { controlsPosition: 'split', position: 'end' },
  style: {
    [`&:where(.${inputAdornmentClasses.filled}:not(.${inputAdornmentClasses.hiddenLabel}))`]: {
      marginTop: 16,
    },
  },
} as const;

export default filledSplitEndAdornmentOffset;
