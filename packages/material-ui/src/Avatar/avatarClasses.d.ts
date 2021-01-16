export interface AvatarClasses {
  root: string;
  colorDefault: string;
  circular: string;
  rounded: string;
  square: string;
  img: string;
  fallback: string;
}

declare const avatarClasses: AvatarClasses;

export function getAvatarUtilityClass(slot: string): string;

export default avatarClasses;
