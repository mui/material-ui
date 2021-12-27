export default function createGetThemeVar<T extends string = string>(prefix: string = '') {
  function appendVar(...vars: string[]): string {
    if (!vars.length) {
      return '';
    }
    return `, var(--${prefix ? `${prefix}-` : ''}${vars[0]}${appendVar(...vars.slice(1))})`;
  }

  const getThemeVar = (field: T, ...vars: T[]) => {
    return `var(--${prefix ? `${prefix}-` : ''}${field}${appendVar(...vars)})`;
  };
  return getThemeVar;
}
