export default function isObjectEmpty(object: object) {
  // eslint-disable-next-line
  for (const _ in object) {
    return false;
  }
  return true;
}
