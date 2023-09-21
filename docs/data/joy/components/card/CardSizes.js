import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';

export default function CardSizes() {
  return (
    <Stack spacing={1}>
      <Card size="sm">Small card</Card>
      <Card>Medium card (default)</Card>
      <Card size="lg">Large card</Card>
    </Stack>
  );
}
