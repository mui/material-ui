export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    !!keys[0].match(/^(colorSchemeSelector|typography|variants|breakpoints)$/) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/^(mode)$/)) ||
    (keys[0] === 'focus' && keys[1] !== 'thickness')
  );
}
