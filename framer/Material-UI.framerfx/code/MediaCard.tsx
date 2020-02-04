import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import Card from '@material-ui/core/Card';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import CardActionArea from '@material-ui/core/CardActionArea';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import CardActions from '@material-ui/core/CardActions';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import CardContent from '@material-ui/core/CardContent';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import CardMedia from '@material-ui/core/CardMedia';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiButton from '@material-ui/core/Button';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiTypography from '@material-ui/core/Typography';
import { IconButton } from './IconButton';

// Define type of property
interface Props {
  imageFile?: string;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  action1?: string;
  action2?: string;
  icon1?: string;
  icon2?: string;
}

export class MediaCard extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    width: 300,
    height: 230,
    action1: 'View',
    imageFile: '',
    imageUrl: 'https://source.unsplash.com/random/320x180?laptop',
    title: 'Material Improvement',
    subtitle: 'by Laura Philips',
    body:
      "Discover how Material-UI, the leading React Material Design component library, can help to improve your users' experience.",
    icon1: 'share',
    icon2: 'more_vert',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    imageFile: {
      type: ControlType.Image,
      title: 'Image file',
    },
    imageUrl: {
      type: ControlType.String,
      title: 'Image URL',
      hidden(props) {
        return props.imageFile !== '';
      },
    },
    title: { type: ControlType.String, title: 'Title' },
    subtitle: { type: ControlType.String, title: 'Subtitle' },
    body: { type: ControlType.String, title: 'Body text' },
    action1: { type: ControlType.String, title: 'Action one' },
    action2: {
      type: ControlType.String,
      title: 'Action two',
      hidden(props) {
        return props.action1 === '' && props.action2 === '';
      },
    },
    icon1: { type: ControlType.String, title: 'Icon one' },
    icon2: {
      type: ControlType.String,
      title: 'Icon two',
      hidden(props) {
        return props.icon1 === '' && props.icon2;
      },
    },
  };

  render() {
    const {
      action1,
      action2,
      body,
      icon1,
      icon2,
      imageFile,
      imageUrl,
      subtitle,
      title,
      ...other
    } = this.props;

    return (
      <Card {...other}>
        <CardActionArea>
          {(imageFile || imageUrl) && (
            <CardMedia
              style={{ paddingTop: '56.25%' }}
              image={imageFile || imageUrl}
              title={title}
            />
          )}
          <CardContent>
            {title && (
              <MuiTypography gutterBottom variant="h5" component="h2">
                {title}
              </MuiTypography>
            )}
            {subtitle && (
              <MuiTypography gutterBottom variant="subtitle1" color="textSecondary">
                {subtitle}
              </MuiTypography>
            )}
            {body && (
              <MuiTypography component="p" color="textPrimary">
                {body}
              </MuiTypography>
            )}
          </CardContent>
        </CardActionArea>
        {(action1 !== '' || icon1 !== '') && (
          <CardActions>
            {action1 !== '' && (
              <MuiButton size="small" color="primary">
                {action1}
              </MuiButton>
            )}
            {action2 !== '' && (
              <MuiButton size="small" color="primary">
                {action2}
              </MuiButton>
            )}
            <div style={{ flex: 1 }} />
            {icon1 !== '' && <IconButton icon={icon1} />}
            {icon2 !== '' && <IconButton icon={icon2} />}
          </CardActions>
        )}
      </Card>
    );
  }
}
