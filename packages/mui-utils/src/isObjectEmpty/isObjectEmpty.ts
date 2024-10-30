export default function isObjectEmpty(object: any): boolean {
  // eslint-disable-next-line
  for (const _ in object) {
    return false;
  }
  return true;
}
