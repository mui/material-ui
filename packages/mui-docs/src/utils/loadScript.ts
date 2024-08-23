export default function loadScript(src: string, position: HTMLElement | null) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  if (position) {
    position.appendChild(script);
  }

  return script;
}
