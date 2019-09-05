const hasSymbol = typeof Symbol === 'function';

export default (hasSymbol && Symbol.for ? Symbol.for('mui.nested') : '__THEME_NESTED__');
