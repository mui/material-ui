import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';

export default function AppContainer(props) {
  const { sx, ...other } = props;

  return (
    <Container
      component="main"
      id="main-content"
      maxWidth={false}
      tabIndex={-1}
      sx={{
        pt: `${80 + 16}px`,
        // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
        // 120ch ≈ 960px (theme.breakpoints.values.md) using 16px Roboto
        // TODO Does it make sense to create breakpoints based on `ch`?
        maxWidth: { md: '120ch' },
        pl: { lg: 6 },
        pr: { lg: 6 },
        ...sx,
      }}
      {...other}
    />
  );
}

AppContainer.propTypes = {
  className: PropTypes.string,
};
