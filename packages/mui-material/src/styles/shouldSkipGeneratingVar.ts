export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    keys[0] === 'motion' ||
    // Keep `focusVisible` inline: its values reference the per-component private vars
    // (`--_focusVisible-offset`/`-behavior`) set on the component root. Hoisting it to a global
    // var resolves those refs at `:root`, where the private vars are unset — the inner-ring inset
    // silently breaks.
    keys[0] === 'focusVisible' ||
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/))
  );
}
