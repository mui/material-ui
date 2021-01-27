import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';
import IncreaseIcon from '@material-ui/icons/AddCircleOutline';
import DecreaseIcon from '@material-ui/icons/RemoveCircleOutline';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  '@material-ui/core/styles': { useTheme },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Input': Input,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
  'docs/src/modules/components/ThemeContext': { DispatchContext },
  '@material-ui/icons/AddCircleOutline': IncreaseIcon,
  '@material-ui/icons/RemoveCircleOutline': DecreaseIcon,
  'docs/src/modules/utils/i18n': { useTranslate },
};
