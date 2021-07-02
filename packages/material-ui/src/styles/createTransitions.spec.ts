import createTransitions from './createTransitions';

createTransitions();
createTransitions({ easing: { easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)' } });
createTransitions({ duration: { short: 250 } });
