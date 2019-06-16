import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { NoSsr } from '@material-ui/core';
import { getRandomItem } from 'utils/helpers';
import { useTheme } from '@material-ui/core/styles';
import { Backpack, Ghost, Cat, IceCream, Browser, SpeechBubble, KawaiiProps } from 'react-kawaii';

const icons = {
  ghost: Ghost,
  cat: Cat,
  backpack: Backpack,
  iceCream: IceCream,
  browser: Browser,
  bubble: SpeechBubble,
};

function getRandomIcon() {
  // @ts-ignore
  if (process.browser && window.Cypress) {
    return icons.ghost;
  }

  const icon = getRandomItem(Object.keys(icons));
  return icons[icon as keyof typeof icons];
}

interface KawaiiIconProps extends KawaiiProps {
  icon?: keyof typeof icons;
  className?: string;
}

const KawaiiIcon: React.FunctionComponent<KawaiiIconProps> = ({ icon, size, ...other }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const calculatedSize = size || isXs ? 230 : 320;

  const Component = React.useMemo(() => (icon ? icons[icon] : getRandomIcon()), [icon]);

  return (
    <NoSsr>
      <Component size={calculatedSize} color={theme.palette.primary.main} {...other} />
    </NoSsr>
  );
};

KawaiiIcon.defaultProps = {
  mood: 'excited',
};

export default KawaiiIcon;
