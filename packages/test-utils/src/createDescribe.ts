/* eslint-env mocha */

type MUIDescribe<P extends any[]> = {
  (...args: P): void;

  skip: (...args: P) => void;
  only: (...args: P) => void;
};
export default <P extends any[]>(
  message: string,
  callback: (...args: P) => void,
): MUIDescribe<P> => {
  const muiDescribe = (...args: P) => {
    describe(message, () => {
      callback(...args);
    });
  };

  muiDescribe.skip = (...args: P) => {
    describe.skip(message, () => {
      callback(...args);
    });
  };
  muiDescribe.only = (...args: P) => {
    describe.only(message, () => {
      callback(...args);
    });
  };

  return muiDescribe;
};
