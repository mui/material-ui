const hasSymbol = typeof Symbol === 'function';

export default (hasSymbol ? Symbol('nested') : '__THEME_NESTED__');
