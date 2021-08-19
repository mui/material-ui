import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import DialogContentText, {
  dialogContentTextClasses as classes,
} from '@material-ui/core/DialogContentText';

describe('<DialogContentText />', () => {
  const render = createClientRender();

  describeConformance(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiDialogContentText',
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentsProp', 'themeVariants'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <span data-testid="test-children" />;
      const { getByTestId } = render(<DialogContentText>{children}</DialogContentText>);

      getByTestId('test-children');
    });
  });
});
