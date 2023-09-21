/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
/**
 * Used to cache a stats object for the virtual file.
 * Extracted from the `mock-fs` package.
 *
 * @author Tim Schaub http://tschaub.net/
 * @author `webpack-virtual-modules` Contributors
 * @link https://github.com/tschaub/mock-fs/blob/master/lib/binding.js
 * @link https://github.com/tschaub/mock-fs/blob/master/license.md
 */
import constants from 'constants';

export default class VirtualStats {
  /**
   * Create a new stats object.
   *
   * @param config Stats properties.
   */
  constructor(config) {
    Object.keys(config).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(config, key)) {
        return;
      }
      this[key] = config[key];
    });
  }

  /**
   * Check if mode indicates property.
   */
  _checkModeProperty(property) {
    return (this.mode & constants.S_IFMT) === property;
  }

  isDirectory() {
    return this._checkModeProperty(constants.S_IFDIR);
  }

  isFile() {
    return this._checkModeProperty(constants.S_IFREG);
  }

  isBlockDevice() {
    return this._checkModeProperty(constants.S_IFBLK);
  }

  isCharacterDevice() {
    return this._checkModeProperty(constants.S_IFCHR);
  }

  isSymbolicLink() {
    return this._checkModeProperty(constants.S_IFLNK);
  }

  isFIFO() {
    return this._checkModeProperty(constants.S_IFIFO);
  }

  isSocket() {
    return this._checkModeProperty(constants.S_IFSOCK);
  }
}
