export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/))
  );
}
