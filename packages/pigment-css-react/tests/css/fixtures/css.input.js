import { css } from '@pigment-css/react';

const cls1 = css`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.size.font.h1};
`;
