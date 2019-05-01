export interface DefaultTriggerProps {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerProps = DefaultTriggerProps & any;

export type OnTriggerEval = (
  event: Event,
  value: React.MutableRefObject<any>,
  props?: TriggerProps,
) => boolean;

export type UseScrollTriggerProps = {
  onTriggerEval?: OnTriggerEval;
} & TriggerProps;

export default function useScrollTrigger(
  props?: UseScrollTriggerProps,
): [boolean, React.Dispatch<any>];
