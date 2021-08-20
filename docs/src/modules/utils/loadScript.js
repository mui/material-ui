export default function loadScript(src, position) {
  const script = document.createElement('script');
  script.setAttribute('defer', '');
  script.src = src;
  position.appendChild(script);

  return script;
}
