const hasSymbol = typeof Symbol === 'function';

export default (hasSymbol ? Symbol.for('nested') : '__THEME_NESTED__');
