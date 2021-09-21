import createTransitions, {
  Easing,
  Duration as TransitionDuration,
} from '@material-ui/core/styles/createTransitions';

const transitions = createTransitions({});

// type A = TransitionDuration | Easing

export const MuiButtonBaseStyleOverrides = {
  root: {
    '&.MuiButton-root': {
      fontFamily: '"Nunito", Avenir, sans-serif',
      boxSizing: 'border-box',
      transition: transitions.create(['background-color', 'box-shadow', 'border'], {
        duration: transitions.duration.short,
      }),
    },
  },
};
