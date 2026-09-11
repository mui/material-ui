export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    keys[0] === 'motion' ||
    // Keep `focusVisible` inline: its values reference the per-component private vars
    // (`--_focusVisible-offset`/`-behavior`). Hoisted to a `:root` var they resolve where those
    // vars are unset, silently breaking the inner-ring inset.
    keys[0] === 'focusVisible' ||
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/)) ||
    // `theme.states` holds ready-to-use STYLE objects keyed by state name
    // (`hover`, `selectedHover`, `disabled`). Hoisting them to `:root` vars would
    // emit one var per state-property pair and resolve nowhere useful. This skips
    // the generated OUTPUT only — `palette.states`, where a theme may put the
    // per-scheme input levers, is a different node and is still emitted.
    keys[0] === 'states'
  );
}
