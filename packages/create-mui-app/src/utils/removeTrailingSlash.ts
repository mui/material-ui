export default function removeTrailingSlash(input: string): string {
  if (input[input.length - 1] === '/') {
    return input.slice(0, input.length - 2);
  }
  return input;
}
