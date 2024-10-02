import { styled } from './zero-styled';

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.vars['sys-color-primary'],
  color: theme.vars['sys-color-on-primary'],
  border: 'none',
  boxShadow: 'none',
  boxSizing: 'border-box',
  padding: '6px 16px',
  borderRadius: '40px',
  height: '40px',
  fontSize: '0.875rem',
}));

export default Button;
