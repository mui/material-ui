import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function TitleBodyIconExample() {
  return (
    <Box sx={{ '& *:not(path, i)': { outline: '1px solid rgb(255 53 53 / 40%)' } }}>
      <Stack spacing={2} sx={{ maxWidth: '60ch' }}>
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
              <i>title-lg</i>: Title of the component
            </Typography>
            <Typography level="body-md">
              <i>body-md</i>: This is the description of the component that contain
              some information of it.
            </Typography>
          </div>
        </Stack>

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
              <i>title-md</i>: Title of the component
            </Typography>
            <Typography level="body-md">
              <i>body-md</i>: This is the description of the component that contain
              some information of it.
            </Typography>
            <Typography level="body-sm">
              <i>body-sm</i>: Metadata, for example a date.
            </Typography>
          </div>
        </Stack>

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
              <i>title-sm</i>: Title of the component
            </Typography>
            <Typography level="body-sm">
              <i>body-sm</i>: This is the description of the component that contain
              some information of it.
            </Typography>
            <Typography level="body-xs">
              <i>body-xs</i>: Metadata, for example a date.
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
}
