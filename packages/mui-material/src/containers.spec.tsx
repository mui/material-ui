import * as React from 'react';
import AccordionActions, { AccordionActionsProps } from '@mui/material/AccordionActions';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import AlertTitle, { AlertTitleProps } from '@mui/material/AlertTitle';
import Card, { CardProps } from '@mui/material/Card';
import CardActions, { CardActionsProps } from '@mui/material/CardActions';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogContentText, { DialogContentTextProps } from '@mui/material/DialogContentText';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import ListItemAvatar, { ListItemAvatarProps } from '@mui/material/ListItemAvatar';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemSecondaryAction, {
  ListItemSecondaryActionProps,
} from '@mui/material/ListItemSecondaryAction';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import TableFooter, { TableFooterProps } from '@mui/material/TableFooter';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';

function expectType<Expected, Actual extends Expected>(actual: Actual) {}

// A wrapper that takes the component's own props must be able to spread them
// back in. Two conflicting `ref`s on a props type pass an identity check but
// fail here, which is the regression this file exists to catch.
function AccordionActionsWrapper(props: AccordionActionsProps) {
  return <AccordionActions {...props} />;
}
function AccordionDetailsWrapper(props: AccordionDetailsProps) {
  return <AccordionDetails {...props} />;
}
function AlertTitleWrapper(props: AlertTitleProps) {
  return <AlertTitle {...props} />;
}
function CardWrapper(props: CardProps) {
  return <Card {...props} />;
}
function CardActionsWrapper(props: CardActionsProps) {
  return <CardActions {...props} />;
}
function CardContentWrapper(props: CardContentProps) {
  return <CardContent {...props} />;
}
function DialogActionsWrapper(props: DialogActionsProps) {
  return <DialogActions {...props} />;
}
function DialogContentWrapper(props: DialogContentProps) {
  return <DialogContent {...props} />;
}
function DialogContentTextWrapper(props: DialogContentTextProps) {
  return <DialogContentText {...props} />;
}
function DialogTitleWrapper(props: DialogTitleProps) {
  return <DialogTitle {...props} />;
}
function FormGroupWrapper(props: FormGroupProps) {
  return <FormGroup {...props} />;
}
function ListItemAvatarWrapper(props: ListItemAvatarProps) {
  return <ListItemAvatar {...props} />;
}
function ListItemIconWrapper(props: ListItemIconProps) {
  return <ListItemIcon {...props} />;
}
function ListItemSecondaryActionWrapper(props: ListItemSecondaryActionProps) {
  return <ListItemSecondaryAction {...props} />;
}
function TableBodyWrapper(props: TableBodyProps) {
  return <TableBody {...props} />;
}
function TableContainerWrapper(props: TableContainerProps) {
  return <TableContainer {...props} />;
}
function TableFooterWrapper(props: TableFooterProps) {
  return <TableFooter {...props} />;
}
function TableHeadWrapper(props: TableHeadProps) {
  return <TableHead {...props} />;
}

// A callback ref must receive the element the component actually renders,
// not `unknown`.
function CallbackRefs() {
  return (
    <React.Fragment>
      <AccordionActions ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <AccordionDetails ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <CardActions ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <DialogActions ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <DialogContent ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <FormGroup ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <ListItemAvatar ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <ListItemIcon ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <Card ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <CardContent ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <TableContainer ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <ListItemSecondaryAction
        ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)}
      />
      <TableBody ref={(node) => expectType<HTMLTableSectionElement | null, typeof node>(node)} />
      <TableFooter ref={(node) => expectType<HTMLTableSectionElement | null, typeof node>(node)} />
      <TableHead ref={(node) => expectType<HTMLTableSectionElement | null, typeof node>(node)} />
    </React.Fragment>
  );
}

// An object ref of the wrong element must be rejected.
function ObjectRefs() {
  return (
    <React.Fragment>
      <AccordionActions ref={React.createRef<HTMLDivElement>()} />
      {/* @ts-expect-error TableBody renders a tbody. */}
      <TableBody ref={React.createRef<HTMLDivElement>()} />
      {/* @ts-expect-error AccordionActions renders a div. */}
      <AccordionActions ref={React.createRef<HTMLSpanElement>()} />
    </React.Fragment>
  );
}

// The polymorphic components keep their `component` prop working.
function Polymorphic() {
  return (
    <React.Fragment>
      <Card component="section" />
      <TableContainer component="main" />
      <TableBody component="div" />
    </React.Fragment>
  );
}
