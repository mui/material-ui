import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme }) => ({
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  variants: [
    ...Object.entries((theme.vars || theme).palette as Record<string, any>)
      .filter(([, value]) => value && value[400])
      .map(([color, value]) => ({
        props: { color },
        style: {
          background: `linear-gradient(90deg, ${value[400]} 5%, ${value.main} 90%)`,
        },
      })),
  ],
}));

export default GradientText;
