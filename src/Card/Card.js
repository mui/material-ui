// @flow
// @inheritedComponent Paper

import React from 'react';
import Paper from '../Paper';

type ProvidedProps = {
  raised: boolean,
};

export type Props = {
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised?: boolean,
};

function Card(props: ProvidedProps & Props) {
  const { raised, ...other } = props;

  return <Paper elevation={raised ? 8 : 2} {...other} />;
}

Card.defaultProps = {
  raised: false,
};

export default Card;
