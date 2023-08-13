import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/joy';

type FileIconProps = {
  fileType: string;
};

export default function FileIcon({ fileType }: FileIconProps) {
  return (
    <Box sx={{ position: 'relative', ml: 1 }}>
      <svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        display="block"
      >
        <path
          d="M0.75 4C0.75 2.20508 2.20508 0.75 4 0.75H20C20.1212 0.75 20.2375 0.798159 20.3232 0.883885L31.1161 11.6768C31.2018 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4Z"
          fill="white"
          stroke="#D0D5DD"
          strokeWidth="1.5"
        />
        <path
          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
          stroke="#D0D5DD"
          strokeWidth="1.5"
        />
      </svg>

      <Sheet
        color="danger"
        variant="solid"
        sx={{
          position: 'absolute',
          bottom: 6,
          left: -6,
          py: 0.25,
          px: 0.5,
          borderRadius: 2,
          lineHeight: 1,
          fontSize: 10,
          textTransform: 'uppercase',
          fontWeight: 'xl',
        }}
      >
        {fileType}
      </Sheet>
    </Box>
  );
}
