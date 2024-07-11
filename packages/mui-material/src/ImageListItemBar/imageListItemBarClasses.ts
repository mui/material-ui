import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ImageListItemBarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="bottom"`. */
  positionBottom: string;
  /** Styles applied to the root element if `position="top"`. */
  positionTop: string;
  /** Styles applied to the root element if `position="below"`. */
  positionBelow: string;
  /** Styles applied to the action container element if `actionPosition="left"`. */
  actionPositionLeft: string;
  /** Styles applied to the action container element if `actionPosition="right"`. */
  actionPositionRight: string;
  /** Styles applied to the title and subtitle container element. */
  titleWrap: string;
  /** Styles applied to the title and subtitle container element if `position="below"`.
   * @deprecated Combine the [.MuiImageListItemBar-titleWrap](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-titleWrap) and [.MuiImageListItemBar-positionBelow](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-positionBelow) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleWrapBelow: string;
  /** Styles applied to the container element if `actionPosition="left"`.
   * @deprecated Combine the [.MuiImageListItemBar-titleWrap](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-titleWrap) and [.MuiImageListItemBar-actionPositionLeft](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-actionPositionLeft) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleWrapActionPosLeft: string;
  /** Styles applied to the container element if `actionPosition="right"`.
   * @deprecated Combine the [.MuiImageListItemBar-titleWrap](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-titleWrap) and [.MuiImageListItemBar-actionPositionRight](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-actionPositionRight) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleWrapActionPosRight: string;
  /** Styles applied to the title container element. */
  title: string;
  /** Styles applied to the subtitle container element. */
  subtitle: string;
  /** Styles applied to the actionIcon if supplied. */
  actionIcon: string;
  /** Styles applied to the actionIcon if `actionPosition="left"`.
   * @deprecated Combine the [.MuiImageListItemBar-actionIcon](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-actionIcon) and [.MuiImageListItemBar-actionPositionLeft](/material-ui/api/image-list-item-bar/#image-list-item-bar-classes-actionPositionLeft) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
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
    'actionPositionLeft',
    'actionPositionRight',
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
