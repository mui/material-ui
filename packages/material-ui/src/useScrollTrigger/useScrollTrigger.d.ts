export interface DefaultEvalOptions {
  directional?: boolean;
  threshhold?: number;
}

export type EvalOptions = DefaultEvalOptions & any;

export interface OnEvalProps extends EvalOptions {
  event: Event;
  store: React.MutableRefObject<any>;
}

export type OnEval = (event: Event, store: React.MutableRefObject<any>) => boolean;

export interface UseScrollTriggerProps extends EvalOptions {
  onEval?: OnEval;
}

export default function useScrollTrigger(
  props?: UseScrollTriggerProps,
): [boolean, React.Dispatch<any>, React.Dispatch<React.SetStateAction<{}>>];
