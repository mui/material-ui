import * as React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {description}
            </Typography>
          )}
        </Box>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
