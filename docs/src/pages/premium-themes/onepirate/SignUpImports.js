import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Link': Link,
  'react-final-form': { Field, Form, FormSpy },
  './modules/components/Typography': Typography,
  './modules/views/AppFooter': AppFooter,
  './modules/views/AppAppBar': AppAppBar,
  './modules/views/AppForm': AppForm,
  './modules/form/validation': { email, required },
  './modules/form/RFTextField': RFTextField,
  './modules/form/FormButton': FormButton,
  './modules/form/FormFeedback': FormFeedback,
  './modules/withRoot': withRoot,
};
