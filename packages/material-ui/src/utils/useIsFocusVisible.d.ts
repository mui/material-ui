export default function useIsFocusVisible(): {
  isFocusVisible: (event: React.ChangeEvent) => boolean;
  onBlurVisible: () => void;
  ref: React.Ref<unknown>;
};
