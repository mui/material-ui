import { createTheme, Theme } from '@material-ui/core/styles';

{
  const transitions = createTheme().transitions;
  transitions.create('all');
  transitions.create('all', { easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
  transitions.create('all', { duration: 250 });
}
