import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiAppBar from '@material-ui/core/AppBar';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import Toolbar from '@material-ui/core/Toolbar';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import Typography from '@material-ui/core/Typography';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import Button from '@material-ui/core/Button';
import { IconButton } from './IconButton';

// Define type of property
interface Props {
  title?: string;
  leftIcon?: string;
  icon1?: string;
  icon1Badge?: string;
  icon2?: string;
  icon2Badge?: string;
  action1?: string;
  action2?: string;
}

export class AppBar extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    width: 300,
    height: 56,
    leftIcon: 'menu',
    title: 'Material-UI',
    action1: 'Login',
    action2: '',
    icon1: 'notifications',
    icon1Badge: '8',
    icon2: 'account_circle',
    icon2Badge: '',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    leftIcon: { type: ControlType.String, title: 'Left icon' },
    title: { type: ControlType.String, title: 'Title' },
    action1: { type: ControlType.String, title: 'Action 1' },
    action2: {
      type: ControlType.String,
      title: 'Action 2',
      hidden(props) {
        return props.action1 === '' && props.action2 !== '';
      },
    },
    icon1: { type: ControlType.String, title: 'Icon 1' },
    icon1Badge: { type: ControlType.String, title: 'Icon 1 badge' },
    icon2: {
      type: ControlType.String,
      title: 'Icon 2',
      hidden(props) {
        return props.icon1 === '' && props.icon2 !== '';
      },
    },
    icon2Badge: { type: ControlType.String, title: 'Icon 2 badge' },
  };

  render() {
    const { action1, action2, icon1, icon1Badge, icon2, icon2Badge, leftIcon, title } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <MuiAppBar position="static">
          <Toolbar>
            {leftIcon && (
              <IconButton
                icon={leftIcon}
                // tslint:disable-next-line: ban-ts-ignore
                // @ts-ignore
                style={{ marginLeft: -12, marginRight: 20 }}
                color="inherit"
              />
            )}
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {action1 && <Button color="inherit">{action1}</Button>}
            {action2 && <Button color="inherit">{action2}</Button>}
            {icon1 && (
              <IconButton
                icon={icon1}
                badgeColor="secondary"
                badgeContent={icon1Badge}
                // tslint:disable-next-line: ban-ts-ignore
                // @ts-ignore
                style={{ marginRight: 8 }}
                color="inherit"
              />
            )}
            {icon2 && (
              <IconButton
                icon={icon2}
                badgeContent={icon2Badge}
                // tslint:disable-next-line: ban-ts-ignore
                // @ts-ignore
                style={{ marginRight: 8 }}
                color="inherit"
              />
            )}
          </Toolbar>
        </MuiAppBar>
      </div>
    );
  }
}
