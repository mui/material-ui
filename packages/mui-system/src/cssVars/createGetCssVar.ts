export default function createGetCssVar<T extends string = string>(prefix: string = '') {
  function appendVar(...vars: string[]): string {
    if (!vars.length) {
      return '';
    }
    return `, var(--${prefix ? `${prefix}-` : ''}${vars[0]}${appendVar(...vars.slice(1))})`;
  }

  const getCssVar = <AdditionalVars extends string = never>(
    field: T | AdditionalVars,
    ...vars: (T | AdditionalVars)[]
  ) => {
    return `var(--${prefix ? `${prefix}-` : ''}${field}${appendVar(...vars)})`;
  };
  return getCssVar;
}
