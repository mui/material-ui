import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';

export default function TypographyTitleBody() {
  return (
    <Stack spacing={2} sx={{ maxWidth: '60ch' }}>
      <Card>
        <Typography level="title-lg">
          Title of the component{' '}
          <Typography
            level="title-lg"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            title-lg
          </Typography>
        </Typography>
        <Typography level="body-md">
          This is the description of the component that contain some information of
          it.{' '}
          <Typography
            level="body-md"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            body-md
          </Typography>
        </Typography>
      </Card>
      <Card>
        <Typography level="title-md">
          Title of the component{' '}
          <Typography
            level="title-md"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            title-md
          </Typography>
        </Typography>
        <Typography level="body-md">
          This is the description of the component that contain some information of
          it.{' '}
          <Typography
            level="body-md"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            body-md
          </Typography>
        </Typography>
        <Typography level="body-sm">
          Metadata, for example a date.{' '}
          <Typography
            level="body-sm"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            body-sm
          </Typography>
        </Typography>
      </Card>
      <Card>
        <Typography level="title-sm">
          Title of the component{' '}
          <Typography
            level="title-sm"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            title-sm
          </Typography>
        </Typography>
        <Typography level="body-sm">
          This is the description of the component that contain some information of
          it.{' '}
          <Typography
            level="body-sm"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            body-sm
          </Typography>
        </Typography>
        <Typography level="body-xs">
          Metadata, for example a date.{' '}
          <Typography
            level="body-xs"
            textColor="var(--joy-palette-success-plainColor)"
            sx={{ fontFamily: 'monospace', opacity: '50%' }}
          >
            body-xs
          </Typography>
        </Typography>
      </Card>
    </Stack>
  );
}
