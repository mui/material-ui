import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiAvatar from '@material-ui/core/Avatar';
import { Icon } from './Icon';

interface Props {
  backgroundColor: string;
  textColor: string;
  icon: string;
  avatarImageFile: string;
  avatarImageUrl: string;
  label: string;
  width: number | string;
  height: number;
}

export function Avatar(props: Props): JSX.Element {
  const {
    backgroundColor,
    height,
    icon,
    avatarImageFile: imageFile,
    avatarImageUrl: imageUrl,
    label,
    textColor,
    width,
    ...other
  } = props;

  return imageFile || imageUrl ? (
    <MuiAvatar src={imageFile || imageUrl} style={{ height, width }} {...other} />
  ) : (
    <MuiAvatar style={{ color: textColor, backgroundColor, height, width }} {...other}>
      {icon === '' ? label : <Icon icon={icon} />}
    </MuiAvatar>
  );
}

Avatar.defaultProps = {
  backgroundColor: '#4154af',
  textColor: undefined,
  icon: 'face',
  avatarImageFile: '',
  avatarImageUrl: 'https://i.pravatar.cc/300',
  label: 'MB',
  width: 40,
  height: 40,
};

addPropertyControls(Avatar, {
  backgroundColor: {
    type: ControlType.Color,
    title: 'Background color',
  },
  textColor: {
    type: ControlType.Color,
    title: 'Text color',
  },
  icon: {
    type: ControlType.String,
    title: 'Icon',
  },
  avatarImageFile: {
    type: ControlType.Image,
    title: 'Avatar Image File',
  },
  avatarImageUrl: {
    type: ControlType.String,
    title: 'Avatar Image URL',
    hidden: function hidden(props) {
      return props.avatarImageFile !== '';
    },
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
