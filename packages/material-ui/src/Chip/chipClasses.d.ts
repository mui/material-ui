export interface ChipClasses {
  root: string;
  sizeSmall: string;
  sizeMedium: string;
  colorPrimary: string;
  colorSecondary: string;
  disabled: string;
  clickable: string;
  clickableColorPrimary: string;
  clickableColorSecondary: string;
  deletable: string;
  deletableColorPrimary: string;
  deletableColorSecondary: string;
  outlined: string;
  filled: string;
  outlinedPrimary: string;
  outlinedSecondary: string;
  avatar: string;
  avatarSmall: string;
  avatarMedium: string;
  avatarColorPrimary: string;
  avatarColorSecondary: string;
  icon: string;
  iconSmall: string;
  iconMedium: string;
  iconColorPrimary: string;
  iconColorSecondary: string;
  label: string;
  labelSmall: string;
  labelMedium: string;
  deleteIcon: string;
  deleteIconSmall: string;
  deleteIconMedium: string;
  deleteIconColorPrimary: string;
  deleteIconColorSecondary: string;
  deleteIconOutlinedColorPrimary: string;
  deleteIconOutlinedColorSecondary: string;
  focusVisible: string;
}

declare const chipClasses: ChipClasses;

export function getChipUtilityClass(slot: string): string;

export default chipClasses;
