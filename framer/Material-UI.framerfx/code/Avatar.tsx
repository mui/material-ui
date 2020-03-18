import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiAvatar from '@material-ui/core/Avatar';
import { Icon } from './Icon';

interface Props {
  variant?: 'circle' | 'rounded' | 'square';
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
  imageFile?: string;
  imageUrl?: string;
  label?: string;
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  variant: 'circle',
  backgroundColor: '#4154af',
  textColor: undefined,
  icon: 'face',
  imageFile: '',
  imageUrl: 'https://i.pravatar.cc/300',
  label: 'MB',
  width: 40,
  height: 40,
};

export const Avatar: React.SFC<Props> = (props: Props) => {
  const {
    backgroundColor,
    height,
    icon,
    imageFile,
    imageUrl,
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
};

Avatar.defaultProps = defaultProps;

addPropertyControls(Avatar, {
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['circle', 'rounded', 'square'],
  },
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
  imageFile: {
    type: ControlType.Image,
    title: 'Image File',
    hidden: function hidden(props) {
      return props.primaryAction && props.primaryAction !== 'avatar';
    },
  },
  imageUrl: {
    type: ControlType.String,
    title: 'Image URL',
    hidden: function hidden(props) {
      return props.imageFile !== '' || (props.primaryAction && props.primaryAction !== 'avatar');
    },
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
