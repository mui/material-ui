export interface Cancelable {
  clear(): void;
}

export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait?: number
): T & Cancelable;
