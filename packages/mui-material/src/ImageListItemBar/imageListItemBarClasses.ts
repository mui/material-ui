import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface ImageListItemBarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="bottom"`. */
  positionBottom: string;
  /** Styles applied to the root element if `position="top"`. */
  positionTop: string;
  /** Styles applied to the root element if `position="below"`. */
  positionBelow: string;
  /** Styles applied to the title and subtitle container element. */
  titleWrap: string;
  /** Styles applied to the title and subtitle container element if `position="below"`. */
  titleWrapBelow: string;
  /** Styles applied to the container element if `actionPosition="left"`. */
  titleWrapActionPosLeft: string;
  /** Styles applied to the container element if `actionPosition="right"`. */
  titleWrapActionPosRight: string;
  /** Styles applied to the title container element. */
  title: string;
  /** Styles applied to the subtitle container element. */
  subtitle: string;
  /** Styles applied to the actionIcon if supplied. */
  actionIcon: string;
  /** Styles applied to the actionIcon if `actionPosition="left"`. */
  actionIconActionPosLeft: string;
}

export type ImageListItemBarClassKey = keyof ImageListItemBarClasses;

export function getImageListItemBarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiImageListItemBar', slot);
}

const imageListItemBarClasses: ImageListItemBarClasses = generateUtilityClasses(
  'MuiImageListItemBar',
  [
    'root',
    'positionBottom',
    'positionTop',
    'positionBelow',
    'titleWrap',
    'titleWrapBottom',
    'titleWrapTop',
    'titleWrapBelow',
    'titleWrapActionPosLeft',
    'titleWrapActionPosRight',
    'title',
    'subtitle',
    'actionIcon',
    'actionIconActionPosLeft',
    'actionIconActionPosRight',
  ],
);

export default imageListItemBarClasses;
