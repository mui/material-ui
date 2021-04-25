export default function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  classes: Record<string, string> | undefined,
): Record<ClassKey, string> {
  const output: Record<ClassKey, string> = {} as any;

  Object.keys(slots).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot: ClassKey) => {
      output[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            if (classes && classes[key]) {
              acc.push(classes[key]);
            }
            acc.push(getUtilityClass(key));
          }
          return acc;
        }, [] as string[])
        .join(' ');
    },
  );

  return output;
}
