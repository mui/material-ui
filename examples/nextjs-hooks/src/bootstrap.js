import { install } from '@material-ui/styles';

// WARNING: this must be done in a separate file, as imports are hoisted.
//
// We will make @material-ui/styles the default style implementation
// for the core components in Material-UI v4.
// This installation step is temporary.
// Behind the scenes, the install() function switches the
// styling engine the core components use.
//
// https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
install();
