// TODO v5: stop using it directly, replace it with useForkRef.
export default function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
