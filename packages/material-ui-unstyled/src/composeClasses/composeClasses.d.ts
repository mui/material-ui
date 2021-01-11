export default function composeClasses(options: { slots: Record<string, string[]>, classes: Record<string, string>, getUtilityClass: (slot: string) => string }): Record<string, string>;
