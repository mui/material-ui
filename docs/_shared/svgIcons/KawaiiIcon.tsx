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
  const icon = getRandomItem(Object.keys(icons));
  // @ts-ignore
  return icons[icon];
}

interface KawaiiIconProps extends KawaiiProps {
  icon?: keyof typeof icons;
  className?: string;
}

const KawaiiIcon: React.FunctionComponent<KawaiiIconProps> = ({ icon, size, ...other }) => {
  const theme = useTheme();
  const dimensionXs = useMediaQuery(theme.breakpoints.down('xs'));
  const calculatedSize = size || dimensionXs ? 230 : 320;
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
