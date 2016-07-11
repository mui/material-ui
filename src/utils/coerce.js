export default function coerce<E>(o: any, t: E): E {
  if (t === undefined) {
    throw new Error('Type given is undefined, it must be available at runtime.  ' +
      `Did you pass in a flow-only type? Arguments: (${o}, ${t})`);
  }

  if (o instanceof t) {
    return o;
  } else {
    throw new Error(`${typeof o} was not expected.`);  // remember we don't have the type at runtime
  }
}
