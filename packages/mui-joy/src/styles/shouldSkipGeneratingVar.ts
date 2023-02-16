export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    !!keys[0].match(
      /^(typography|variants|breakpoints|colorInversion|colorInversionConfig|unstable_sxConfig|unstable_sx)$/,
    ) ||
    (keys[0] === 'palette' && !!keys[1]?.match(/^(mode)$/)) ||
    (keys[0] === 'focus' && keys[1] !== 'thickness')
  );
}
