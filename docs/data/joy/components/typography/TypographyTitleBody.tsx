import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import SvgIcon from '@mui/joy/SvgIcon';

export default function TypographyTitleBody() {
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: '60ch',
      }}
    >
      <Card>
        <Stack direction="row" spacing={1.5}>
          <SvgIcon size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </SvgIcon>
          <div>
            <Typography level="title-lg">
              Title of the component{' '}
              <Typography
                level="title-lg"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // title-lg
              </Typography>
            </Typography>
            <Typography level="body-md">
              This is the description of the component that contain some information
              of it.{' '}
              <Typography
                level="body-md"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // body-md
              </Typography>
            </Typography>
          </div>
        </Stack>
      </Card>
      <Card>
        <Stack direction="row" spacing={1.5}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </SvgIcon>
          <div>
            <Typography level="title-md">
              Title of the component{' '}
              <Typography
                level="title-md"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // title-md
              </Typography>
            </Typography>
            <Typography level="body-md">
              This is the description of the component that contain some information
              of it.{' '}
              <Typography
                level="body-md"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // body-md
              </Typography>
            </Typography>
            <Typography level="body-sm">
              Metadata, e.g. a date.{' '}
              <Typography
                level="body-sm"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // body-sm
              </Typography>
            </Typography>
          </div>
        </Stack>
      </Card>
      <Card>
        <Stack direction="row" spacing={1.5}>
          <SvgIcon size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </SvgIcon>
          <div>
            <Typography level="title-sm">
              Title of the component{' '}
              <Typography
                level="title-sm"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // title-sm
              </Typography>
            </Typography>
            <Typography level="body-sm">
              This is the description of the component that contain some information
              of it.{' '}
              <Typography
                level="body-sm"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // body-sm
              </Typography>
            </Typography>
            <Typography level="body-xs">
              Metadata, e.g. a date.{' '}
              <Typography
                level="body-xs"
                textColor="var(--joy-palette-success-plainColor)"
              >
                // body-xs
              </Typography>
            </Typography>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
