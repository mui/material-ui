import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Modal': Modal,
  '@material-ui/core/Backdrop': Backdrop,
  '@material-ui/core/Fade': Fade,
};
