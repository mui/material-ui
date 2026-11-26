import * as React from 'react';
import type { AccordionActionsProps } from '@mui/material/AccordionActions';
import AccordionActions from '@mui/material/AccordionActions';
import type { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import AccordionDetails from '@mui/material/AccordionDetails';
import type { AlertTitleProps } from '@mui/material/AlertTitle';
import AlertTitle from '@mui/material/AlertTitle';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import type { CardActionsProps } from '@mui/material/CardActions';
import CardActions from '@mui/material/CardActions';
import type { CardContentProps } from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import type { DialogActionsProps } from '@mui/material/DialogActions';
import DialogActions from '@mui/material/DialogActions';
import type { DialogContentProps } from '@mui/material/DialogContent';
import DialogContent from '@mui/material/DialogContent';
import type { DialogContentTextProps } from '@mui/material/DialogContentText';
import DialogContentText from '@mui/material/DialogContentText';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import DialogTitle from '@mui/material/DialogTitle';
import type { FormGroupProps } from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';
import type { ListItemAvatarProps } from '@mui/material/ListItemAvatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import type { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemIcon from '@mui/material/ListItemIcon';
import type { ListItemSecondaryActionProps } from '@mui/material/ListItemSecondaryAction';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import type { TableBodyProps } from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import type { TableContainerProps } from '@mui/material/TableContainer';
import TableContainer from '@mui/material/TableContainer';
import type { TableFooterProps } from '@mui/material/TableFooter';
import TableFooter from '@mui/material/TableFooter';
import type { TableHeadProps } from '@mui/material/TableHead';
import TableHead from '@mui/material/TableHead';

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
      <AlertTitle ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <DialogTitle ref={(node) => expectType<HTMLElement | null, typeof node>(node)} />
      <DialogContentText ref={(node) => expectType<HTMLElement | null, typeof node>(node)} />
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
