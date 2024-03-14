import * as React from 'react';
import { CssVarsProvider, styled } from '@mui/joy/styles';
import { applySolidInversion } from '@mui/joy/colorInversion';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

const Wrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    borderRadius: 20,
    width: 300,
    maxWidth: '100%',
    ...theme.variants.solid.warning,
  }),
  applySolidInversion('warning'),
);

export default function JoyColorInversionStyled() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Wrapper>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <div>
            <Typography level="title-lg">$4,236</Typography>
            <Typography fontSize="xs" fontFamily="code">
              CREDIT
            </Typography>
          </div>
          <SvgIcon sx={{ ml: 'auto' }}>
            <svg
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" fill="currentColor" />
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                fill="#312ECB"
              />
            </svg>
          </SvgIcon>
        </Box>
        <Typography level="title-lg" fontFamily="code">
          •••• •••• •••• 1212
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <div>
            <Typography fontSize="xs" fontFamily="code">
              CARD NAME
            </Typography>
            <Typography level="title-sm" fontSize="sm">
              JOHN DOE
            </Typography>
          </div>
          <div>
            <Typography fontSize="xs" textAlign="right" fontFamily="code">
              EXPIRE
            </Typography>
            <Typography level="title-sm" fontSize="sm" textAlign="right">
              07/25
            </Typography>
          </div>
        </Box>
      </Wrapper>
    </CssVarsProvider>
  );
}
