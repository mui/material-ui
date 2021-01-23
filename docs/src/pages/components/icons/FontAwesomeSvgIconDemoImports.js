import * as React from 'react';
import PropTypes from 'prop-types';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

export default {
  react: React,
  'prop-types': PropTypes,
  '@fortawesome/free-solid-svg-icons/faEllipsisV': { faEllipsisV },
  '@fortawesome/free-solid-svg-icons/faInfo': { faInfo },
  '@fortawesome/react-fontawesome': { FontAwesomeIcon },
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/SvgIcon': SvgIcon,
};
