import * as React from 'react';
import { experimentalStyled as styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Typography from '../components/Typography';

interface FormFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  success?: boolean;
  sx?: SxProps<Theme>;
}

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})<FormFeedbackProps>(({ theme }) => ({
  padding: theme.spacing(2),
  variants: [
    {
      props: ({ error }) => error,
      style: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
      },
    },
    {
      props: ({ success }) => success,
      style: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
      },
    },
  ],
}));

export default function FormFeedback(props: FormFeedbackProps) {
  const { className, children, error, success, ...others } = props;

  return (
    <Root error={error} success={success} className={className} {...others}>
      <Typography color="inherit">{children}</Typography>
    </Root>
  );
}
