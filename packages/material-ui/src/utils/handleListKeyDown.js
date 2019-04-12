import ownerDocument from './ownerDocument';

export default function handleListKeyDown(
  event,
  listRef,
  selectedItemRef,
  disableListWrap,
  onKeyDown,
) {
  const list = listRef.current;
  const key = event.key;
  const currentFocus = ownerDocument(list).activeElement;

  if (
    (key === 'ArrowUp' || key === 'ArrowDown') &&
    (!currentFocus || (currentFocus && !list.contains(currentFocus)))
  ) {
    if (selectedItemRef.current) {
      selectedItemRef.current.focus();
    } else {
      list.firstChild.focus();
    }
  } else if (key === 'ArrowDown') {
    event.preventDefault();
    if (currentFocus.nextElementSibling) {
      currentFocus.nextElementSibling.focus();
    } else if (!disableListWrap) {
      list.firstChild.focus();
    }
  } else if (key === 'ArrowUp') {
    event.preventDefault();
    if (currentFocus.previousElementSibling) {
      currentFocus.previousElementSibling.focus();
    } else if (!disableListWrap) {
      list.lastChild.focus();
    }
  } else if (key === 'Home') {
    event.preventDefault();
    list.firstChild.focus();
  } else if (key === 'End') {
    event.preventDefault();
    list.lastChild.focus();
  }

  if (onKeyDown) {
    onKeyDown(event);
  }
}
