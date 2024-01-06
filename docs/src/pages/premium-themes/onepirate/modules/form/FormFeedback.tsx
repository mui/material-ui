import * as React from 'react';
import { experimentalStyled as styled, SxProps } from '@mui/material/styles';
import Typography from '../components/Typography';

interface FormFeedbackProps {
  error?: boolean;
  success?: boolean;
  sx?: SxProps;
}

const BoxStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})<FormFeedbackProps>(({ theme, error, success }) => ({
  padding: theme.spacing(2),
  ...(error && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  ...(success && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
}));

export default function FormFeedback(
  props: React.HTMLAttributes<HTMLDivElement> & FormFeedbackProps,
) {
  const { className, children, error, success, ...others } = props;

  return (
    <BoxStyled error={error} success={success} className={className} {...others}>
      <Typography color="inherit">{children}</Typography>
    </BoxStyled>
  );
}
