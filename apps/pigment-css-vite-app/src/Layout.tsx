import * as React from 'react';
import { styled } from '@mui/material-pigment-css';

const Main = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  marginInline: 'auto',
  maxWidth: '900px',
  paddingBlock: '16px',
  paddingInline: '8px',
  [theme.breakpoints.up('sm')]: {
    paddingInline: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    paddingInline: '60px',
  },
  '& h1': {
    marginTop: 0,
    marginBottom: 0,
  },
  '& h2': {
    marginTop: 0,
    marginBottom: '0.75em',
  },
  '& .demo-container': {
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(229, 234, 242)',
    borderRadius: '12px',
  },
}));

export default function MaterialUILayout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>;
}
