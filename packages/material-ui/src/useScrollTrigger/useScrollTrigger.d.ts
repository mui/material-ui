export interface DefaultTriggerProps {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerOptions = DefaultTriggerProps & any;

export type OnTriggerEval = (
  event: Event,
  value: React.MutableRefObject<any>,
  options?: TriggerOptions,
) => boolean;

export interface UseScrollTriggerProps {
  onTriggerEval?: OnTriggerEval;
  initialOptions?: TriggerOptions;
}

export default function useScrollTrigger(
  props?: UseScrollTriggerProps,
): [boolean, React.Dispatch<any>, React.Dispatch<React.SetStateAction<{}>>];
