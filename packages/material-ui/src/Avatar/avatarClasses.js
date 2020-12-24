export function getAvatarUtilityClass(name) {
  return `MuiAvatar-${name}`;
}

const avatarClasses = {
  root: getAvatarUtilityClass('root'),
  colorDefault: getAvatarUtilityClass('colorDefault'),
  circular: getAvatarUtilityClass('circular'),
  rounded: getAvatarUtilityClass('rounded'),
  square: getAvatarUtilityClass('square'),
  img: getAvatarUtilityClass('img'),
  fallback: getAvatarUtilityClass('fallback'),
};

export default avatarClasses;
