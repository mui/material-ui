export default function muiErrorMsg(strings: TemplateStringsArray, ...args: unknown[]) {
  return strings.reduce((prev, current, i) => {
    return prev + current + (args[i] || '');
  }, '');
}
