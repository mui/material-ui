import * as React from 'react';
import { styled } from '@mui/material/styles';

const Link = styled('a')({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  color: 'inherit',
});

const DemoLink = React.memo(function DemoLink(props) {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Link tabIndex={props.tabIndex} onClick={handleClick} href={props.href}>
      {props.children}
    </Link>
  );
});

export function renderEmail(params) {
  const email = params.value ?? '';

  return (
    <DemoLink href={`mailto:${email}`} tabIndex={params.tabIndex}>
      {email}
    </DemoLink>
  );
}

export default renderEmail;
