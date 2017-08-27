import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends PaperProps {
  raised?: boolean;
}

export default class Card extends StyledComponent<CardProps> {}
