/**
 * Copies internal immediate statics from material-ui from source to target
 */
export default function hoistMuiStatics(target, source) {
  const internals = ['muiName'];

  for (let i = 0; i < internals.length; i += 1) {
    const key = internals[i];
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    try {
      Object.defineProperty(target, key, descriptor);
    } catch (e) {
      // Avoid failures from read-only properties and undefined descriptors
    }
  }

  return target;
}
