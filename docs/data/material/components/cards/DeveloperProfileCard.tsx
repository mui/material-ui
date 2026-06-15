import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function DeveloperProfileCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 72, height: 72 }}>
            D
          </Avatar>

          <Typography variant="h6">
            Developer Profile
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Full-stack developer passionate about building modern web applications.
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip label="React" />
            <Chip label="TypeScript" />
            <Chip label="MUI" />
          </Stack>

          <Button variant="contained">
            View Profile
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}