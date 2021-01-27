export interface ImageListItemBarClasses {
  root: string;
  positionBottom: string;
  positionTop: string;
  positionBelow: string;
  titleWrap: string;
  titleWrapBottom: string;
  titleWrapTop: string;
  titleWrapBelow: string;
  titleWrapActionPosLeft: string;
  titleWrapActionPosRight: string;
  title: string;
  subtitle: string;
  actionIcon: string;
  actionIconActionPosLeft: string;
  actionIconActionPosRight: string;
}

declare const imageListItemBarClasses: ImageListItemBarClasses;

export function getImageListItemBarUtilityClass(slot: string): string;

export default imageListItemBarClasses;
