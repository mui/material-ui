import errorOnce, { reset } from './errorOnce';

describe('errorOnce', () => {
  it('should log an error only once', () => {
    const consoleError = console.error;
    const errorMock = vi.fn();
    console.error = errorMock;

    errorOnce(true, 'Test error', 'error');
    errorOnce(true, 'Test error', 'error');
    errorOnce(true, 'Test error', 'error');

    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith('Test error');

    console.error = consoleError;
  });

  it('should log a warning only once', () => {
    const consoleWarn = console.warn;
    const warnMock = vi.fn();
    console.warn = warnMock;

    errorOnce(true, 'Test warning', 'warn');
    errorOnce(true, 'Test warning', 'warn');
    errorOnce(true, 'Test warning', 'warn');

    expect(warnMock).toHaveBeenCalledTimes(1);
    expect(warnMock).toHaveBeenCalledWith('Test warning');

    console.warn = consoleWarn;
  });

  it('should not log if condition is false', () => {
    const consoleError = console.error;
    const errorMock = vi.fn();
    console.error = errorMock;

    errorOnce(false, 'This should not log', 'error');
    errorOnce(false, 'This should not log', 'error');

    expect(errorMock).toHaveBeenCalledTimes(0);

    console.error = consoleError;
  });

  it('should reset the cache with reset function', () => {
    const consoleError = console.error;
    const errorMock = vi.fn();
    console.error = errorMock;

    errorOnce(true, 'Reset test error', 'error');
    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith('Reset test error');

    reset();

    errorOnce(true, 'Reset test error', 'error');
    expect(errorMock).toHaveBeenCalledTimes(2);
    expect(errorMock).toHaveBeenLastCalledWith('Reset test error');

    console.error = consoleError;
  });

  it('should use key to identify unique messages', () => {
    const consoleError = console.error;
    const errorMock = vi.fn();
    console.error = errorMock;

    errorOnce(true, 'Message 1', 'error', 'key1');
    errorOnce(true, 'Message 2', 'error', 'key2');
    errorOnce(true, 'Message 1 again', 'error', 'key1'); // Should not log

    expect(errorMock).toHaveBeenCalledTimes(2);
    expect(errorMock).toHaveBeenNthCalledWith(1, 'Message 1');
    expect(errorMock).toHaveBeenNthCalledWith(2, 'Message 2');

    console.error = consoleError;
  });
});
