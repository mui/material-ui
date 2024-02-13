export default function Modal(inProps) {
  const props = getThemeProps({ props: inProps });
  const { onKeyDown, ...other } = props;

  function handleKeyDown(event) {
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  return <div onKeyDown={handleKeyDown} {...other} />;
}
