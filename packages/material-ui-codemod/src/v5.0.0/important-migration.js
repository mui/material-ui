import transformAdapterV4 from './adapter-v4';
import transformAutocompleteRenaming from './autocomplete-rename-closeicon';
import transformAvatarCircular from './avatar-circle-circular';
import transformBadgeOverlap from './badge-overlap-value';
import transformBoxBorderRadius from './box-borderradius-values';
import transformBoxRenameGap from './box-rename-gap';
import transformBoxSxProp from './box-sx-prop';
import transformButtonColorProp from './button-color-prop';
import transformChipVariantProp from './chip-variant-prop';
import transformCircularProgressVariant from './circularprogress-variant';
import transformCollapsedHeight from './collapse-rename-collapsedheight';
import transformCreateTheme from './create-theme';
import transformEmotionPrependCache from './emotion-prepend-cache';
import transformFade from './fade-rename-alpha';
import transformGridJustify from './grid-justify-justifycontent';
import transformHiddenDownProps from './hidden-down-props';
import transformStyles from './material-ui-styles';
import transformMovedLabModules from './moved-lab-modules';
// import transformStyledEngineProvider from './styled-engine-provider';
import transformTextFieldVariantProp from './textfield-variant-prop';
import transformThemeBreakpointsWidth from './theme-breakpoints-width';
import transformThemeBreakpoints from './theme-breakpoints';
import transformThemePaletteMode from './theme-palette-mode';
import transformThemeProvider from './theme-provider';
import transformThemeSpacing from './theme-spacing';
import transformThemeTypographyRound from './theme-typography-round';
import transformUseTransitionProps from './use-transitionprops';
import transformVariantProp from './variant-prop';
import transformWithWidth from './with-width';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  file.source = transformAdapterV4(file, api, options);
  file.source = transformAutocompleteRenaming(file, api, options);
  file.source = transformAvatarCircular(file, api, options);
  file.source = transformBadgeOverlap(file, api, options);
  file.source = transformBoxBorderRadius(file, api, options);
  file.source = transformBoxRenameGap(file, api, options);
  file.source = transformBoxSxProp(file, api, options);
  file.source = transformButtonColorProp(file, api, options);
  file.source = transformChipVariantProp(file, api, options);
  file.source = transformCircularProgressVariant(file, api, options);
  file.source = transformCollapsedHeight(file, api, options);
  file.source = transformCreateTheme(file, api, options);
  file.source = transformEmotionPrependCache(file, api, options);
  file.source = transformFade(file, api, options);
  file.source = transformGridJustify(file, api, options);
  file.source = transformHiddenDownProps(file, api, options);
  file.source = transformStyles(file, api, options);
  file.source = transformMovedLabModules(file, api, options);

  // need to get App path
  // file.source = transformStyledEngineProvider(file, api, options);

  file.source = transformTextFieldVariantProp(file, api, options);
  file.source = transformThemeBreakpointsWidth(file, api, options);
  file.source = transformThemeBreakpoints(file, api, options);
  file.source = transformThemePaletteMode(file, api, options);
  file.source = transformThemeProvider(file, api, options);
  file.source = transformThemeSpacing(file, api, options);
  file.source = transformThemeTypographyRound(file, api, options);
  file.source = transformUseTransitionProps(file, api, options);
  file.source = transformVariantProp(file, api, options);
  file.source = transformWithWidth(file, api, options);

  return file.source;
}
