import { styled, keyframes, css } from '@pigmentcss/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const Component = styled.div(({ theme }) => ({
  color: theme.palette.primary.main,
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
}));

const cls1 = css`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.size.font.h1};
`;

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
  font-size: ${({ theme }) => theme.size.font.h1};
`;

const SliderRail2 = styled.span`
  display: block;
  opacity: 0.38;
  font-size: ${({ theme }) => theme.size.font.h1};
`;
