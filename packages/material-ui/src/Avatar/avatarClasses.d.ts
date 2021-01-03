export interface AvatarClasses {
  root: string;
  colorDefault: string;
  circular: string;
  rounded: string;
  square: string;
  img: string;
  fallback: string;
}

declare const AvatarClasses: AvatarClasses;

export function getAvatarUtilityClass(slot: string): string;

export default AvatarClasses;
