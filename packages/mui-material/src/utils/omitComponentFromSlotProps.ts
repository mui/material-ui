type SlotPropsEntry =
  Record<string, any> | ((ownerState: any) => Record<string, any> | undefined) | undefined;

export default function omitComponentFromSlotProps<SlotProps extends object | undefined>(
  slotProps: SlotProps,
): SlotProps {
  if (!slotProps) {
    return slotProps;
  }

  const entries = slotProps as Record<string, SlotPropsEntry>;
  const result: Record<string, SlotPropsEntry> = {};
  Object.keys(entries).forEach((name) => {
    const entry = entries[name];
    result[name] =
      typeof entry === 'function'
        ? (ownerState: unknown) => ({ ...entry(ownerState), component: undefined })
        : entry && { ...entry, component: undefined };
  });

  return result as SlotProps;
}
