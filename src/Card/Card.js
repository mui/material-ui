// @flow
// @inheritedComponent Paper

import * as React from 'react';
import Paper from '../Paper';

type DefaultProps = {
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

type AllProps = DefaultProps & Props;

function Card(props: AllProps) {
  const { raised, ...other } = props;

  return <Paper elevation={raised ? 8 : 2} {...other} />;
}

Card.defaultProps = {
  raised: false,
};

export default Card;
