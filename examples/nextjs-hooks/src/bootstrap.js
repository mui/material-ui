import { install } from '@material-ui/styles';

// WARNING: this step must be done in a separate file like in this example.
// ES imports are hoisted to the top of the module.
//
// We will make @material-ui/styles the default style implementation
// for the core components in Material-UI v4.
// This installation step is temporary.
// Behind the scenes, the install() function switches the
// styling engine the core components use.
//
// https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
install();
