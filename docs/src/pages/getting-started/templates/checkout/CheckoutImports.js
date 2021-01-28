import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Stepper': Stepper,
  '@material-ui/core/Step': Step,
  '@material-ui/core/StepLabel': StepLabel,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Link': Link,
  '@material-ui/core/Typography': Typography,
  './AddressForm': AddressForm,
  './PaymentForm': PaymentForm,
  './Review': Review,
};
