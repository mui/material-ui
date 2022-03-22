import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function TestStandardPropsUsage() {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node;
    // ...
  }, []);

  return (
    <Dialog open>
      <DialogTitle>Dialog Demo</DialogTitle>
      <DialogContent ref={setContentRef}>
        <DialogContentText>Dialog content</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

import Paper, { PaperProps } from '@mui/material/Paper';
import Container from '@mui/material/Container';

export interface HeaderProps
  extends Omit<PaperProps, 'elevation' | 'square' | 'component' | 'variant'> {
  elevation?: number;
}

// Test polymorphism
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, elevation = 2, sx, ...props }, ref) => (
    <Paper
      ref={ref}
      component="header"
      square
      elevation={elevation}
      sx={{ padding: 2, ...sx }}
      {...props}
    >
      <Container>{children}</Container>
    </Paper>
  ),
);
