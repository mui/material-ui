export default function composeClasses<T extends keyof any>(options: {
  slots: Record<T, string[]>;
  classes?: Record<string, string>;
  getUtilityClass: (slot: string) => string;
}): Record<T, string>;
