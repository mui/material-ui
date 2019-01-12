export const attach = (...classNames) => `&.${classNames.join('.')}`;
export const nest = (...classNames) => `& .${classNames.join('.')}`;

export const APP_BAR = {
  root: 'app-bar__root',
  shaded: 'app-bar--shaded',
};

export const AVATAR = {
  root: 'avatar__root',
  small: 'avatar--small',
  medium: 'avatar--medium',
  ultraLarge: 'avatar--ultra-large',
};

export const BADGE = {
  root: 'badge__root',
  dotted: 'badge--dotted',
};

export const BUTTON = {
  root: 'button__root',
  inverted: 'button--inverted',
  danger: 'button--danger',
};

export const CARD = {
  root: 'card__root',
  contained: 'card__root--contained',
  actionable: 'card__root--actionable',
  spaceGrey: 'card__root--space-grey',
  darkBlue: 'card__root--dark-blue',
};

export const CARD_CONTENT = {
  root: 'card-content__root',
};

export const CARD_ACTION_AREA = {
  root: 'card-action-area__root',
};

export const CARD_ACTIONS = {
  root: 'card-actions__root',
  action: 'card-actions__action',
  contained: 'card-actions--contained',
};

export const CARD_MEDIA = {
  root: 'card-media__root',
  wideScreen: 'card-media--wide-screen',
};

export const CHIP = {
  root: 'chip__root',
  label: 'chip__label',
  narrow: 'chip--narrow',
  icon: 'chip__icon',
  inverted: 'chip--inverted',
};

export const DRAWER = {
  root: 'drawer__root',
};

export const DIVIDER = {
  root: 'divider__root',
  vertical: 'divider--vertical',
};

export const GRID = {
  root: 'grid__root',
  flex: 'grid--flex',
};

export const ICON_BUTTON = {
  root: 'icon-button__root',
  shaded: 'icon-button--shaded',
  noPad: 'icon-button--no-pad',
  narrowPad: 'icon-button--narrow-pad',
  separated: 'icon-button--separated',
  linkInverted: 'icon-button--link-inverted',
};

export const ICON = {
  root: 'icon__root',
  left: 'icon--left',
  right: 'icon--right',
  front: 'icon__front',
  caret: 'icon__caret',
  frontFlipped: 'icon__front--flipped',
  link: 'icon--link',
  linkInverted: 'icon--link-inverted',
  contained: 'icon--contained',
  purple: 'icon--purple',
  white: 'icon--white',
  red: 'icon--red',
  primary: 'icon--primary',
  small: 'icon--small',
};

export const LIST = {
  root: 'list__root',
};

export const LIST_ITEM = {
  root: 'list-item__root',
  header: 'list-item__header',
  headerLabel: 'list-item__header-label',
  headerActionable: 'list-item__header--actionable',
  active: 'list-item--active',
  category: 'list-item__category',
  subcategory: 'list-item__subcategory',
};

export const LIST_ITEM_TEXT = {
  root: 'list-item-text__root',
  primary: 'list-item-text__primary',
  category: 'list-item-text__category',
  subcategory: 'list-item-text__subcategory',
  subcategoryPrimary: 'list-item-text__subcategory--primary',
};

export const LIST_ITEM_ICON = {
  root: 'list-item-icon__root',
  subcategory: 'list-item-icon__subcategory',
};

export const NOTCHED_OUTLINE = {
  root: 'notched-outline__root',
  focused: 'notched-outline--focused',
};

export const OUTLINED_INPUT = {
  root: 'outlined-input__root',
  focused: 'outlined-input--notched-outline',
};

export const TABS = {
  root: 'tabs__root',
  inverted: 'tabs--inverted',
  indicator: 'tabs__indicator',
};

export const TAB = {
  root: 'tab__root',
  label: 'tab__label',
  selected: 'tab--selected',
};

export const TEXT = {
  root: 'text__root',
  bold: 'text--bold',
  link: 'text--link',
  linkInverted: 'text--link-inverted',
  icon: 'text--icon',
  inverted: 'text--inverted',
  indented: 'text--indented',
  indentedLg: 'text--indented-lg',
  light: 'text--light',
  lightWeight: 'text--light-weight',
};

export const TOOLBAR = {
  root: 'toolbar__root',
  narrow: 'toolbar--narrow',
};

export default {
  AVATAR,
  APP_BAR,
  BADGE,
  BUTTON,
  CARD,
  CARD_ACTIONS,
  CARD_MEDIA,
  CARD_CONTENT,
  CARD_ACTION_AREA,
  DIVIDER,
  GRID,
  LIST,
  LIST_ITEM,
  LIST_ITEM_TEXT,
  LIST_ITEM_ICON,
  NOTCHED_OUTLINE,
  ICON,
  ICON_BUTTON,
  TABS,
  TAB,
  TOOLBAR,
  TEXT,
  attach,
  nest,
};
