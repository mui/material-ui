export default function useEventCallback<T extends (...args: any[]) => any>(func: T): T;
