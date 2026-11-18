import { createTheme, unstable_enhanceDensity as enhanceDensity } from '@mui/material/styles';

function takesString(value: string) {
  return value;
}
const theme = createTheme();
takesString(theme.spacing('small'));
takesString(theme.spacing('-xSmall'));
takesString(theme.spacing('xLarge', 2));
takesString(theme.spacing(1, 'auto'));
takesString(theme.spacing('12px'));
takesString(theme.spacing('small', 2, 'auto', '3px'));

enhanceDensity(createTheme(), { spacing: { small: 8 }, touchTarget: 40, iconSize: 20 });
// @ts-expect-error — misspelled step
enhanceDensity(createTheme(), { spacing: { smal: 8 } });
// @ts-expect-error — the scale cannot be extended with new names
enhanceDensity(createTheme(), { huge: 64 });

function takesOptionalString(value: string | undefined) {
  return value;
}
takesString(enhanceDensity(createTheme()).iconSize);
// @ts-expect-error — not a theme member; the scale keys stay on theme.spacing()
takesOptionalString((theme.vars || theme).xxSmall);
