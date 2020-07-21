import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
import MuiButton from '@material-ui/core/Button';

interface Props {
  message?: string;
  width?: number;
  height?: number;
  label?: string;
}

const defaultProps: Props = {
  message: 'I love candy. I love cookies. I love cupcakes.',
  width: 568,
  height: 48,
  label: 'Nom nom nom',
};

export function SnackbarContent(props: Props): JSX.Element {
  const { height, label, width, ...other } = props;
  const action =
    label !== '' ? (
      <MuiButton color="secondary" size="small">
        {label}
      </MuiButton>
    ) : undefined;

  return <MuiSnackbarContent action={action} {...other} />;
}

SnackbarContent.defaultProps = defaultProps;

addPropertyControls(SnackbarContent, {
  message: {
    type: ControlType.String,
    title: 'Message',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
