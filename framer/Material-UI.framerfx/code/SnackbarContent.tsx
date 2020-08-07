import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
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

export const SnackbarContent: React.SFC<Props> = (props: Props) => {
  const { height, label, width, ...other } = props;
  const action =
    label !== '' ? (
      <MuiButton color="secondary" size="small">
        {label}
      </MuiButton>
    ) : undefined;

  return <MuiSnackbarContent action={action} {...other} />;
};

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
