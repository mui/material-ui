/* eslint-disable import/prefer-default-export */
import { classnames } from './tools/classnames';

const cx = (...args) => classnames(args);

export function useCx() {
  return { cx };
}
