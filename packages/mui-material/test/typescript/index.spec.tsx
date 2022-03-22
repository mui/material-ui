import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper, { PaperProps } from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function TestStandardPropsUsage() {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node;
    // ...
  }, []);

  return (
    <Dialog open={true}>
      <DialogTitle>Dialog Demo</DialogTitle>
      <DialogContent ref={setContentRef}>
        <DialogContentText>Dialog content</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export interface HeaderProps
  extends Omit<PaperProps, 'elevation' | 'square' | 'component' | 'variant'> {}

// Test that polymoprism works
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, ...other }, ref) => (
    <Paper ref={ref} component="header" {...other}>
      <Container>{children}</Container>
    </Paper>
  ),
);
