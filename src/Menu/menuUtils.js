export class HotKeyHolder {
  append(key) {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.clear, 500);
    return this.lastKeys = (this.lastKeys || '') + key;
  }
  clear = () => {
    this.timerId = null;
    this.lastKeys = null;
  }
}
