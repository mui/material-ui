export default function coerce<E>(o: any, t: E): E {
  if (o instanceof t) {
    return o;
  } else {
    throw new Error(`${typeof o} was not expected.`);  // remember we don't have the type at runtime
  }
}
