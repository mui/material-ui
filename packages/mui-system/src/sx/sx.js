import styleFunctionSx from '../styleFunctionSx';

function sx(styles) {
  return ({ theme }) => styleFunctionSx({ sx: styles, theme });
}

export default sx;
