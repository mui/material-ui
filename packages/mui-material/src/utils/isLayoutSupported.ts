export default function isLayoutSupported(): boolean {
  return !/jsdom|HappyDOM/.test(window.navigator.userAgent);
}
