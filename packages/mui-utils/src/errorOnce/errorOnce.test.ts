import errorOnce, { reset } from './errorOnce';

describe('errorOnce', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    reset();
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should log an error only once', () => {
    errorOnce(true, 'Test error', 'error');
    errorOnce(true, 'Test error', 'error');
    errorOnce(true, 'Test error', 'error');

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Test error');
  });

  it('should log a warning only once', () => {
    errorOnce(true, 'Test warning', 'warn');
    errorOnce(true, 'Test warning', 'warn');
    errorOnce(true, 'Test warning', 'warn');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Test warning');
  });

  it('should not log if condition is false', () => {
    errorOnce(false, 'This should not log', 'error');
    errorOnce(false, 'This should not log', 'error');

    expect(errorSpy).toHaveBeenCalledTimes(0);
  });

  it('should reset the cache with reset function', () => {
    errorOnce(true, 'Reset test error', 'error');
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Reset test error');

    reset();

    errorOnce(true, 'Reset test error', 'error');
    expect(errorSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenLastCalledWith('Reset test error');
  });

  it('should use key to identify unique messages', () => {
    errorOnce(true, 'Message 1', 'error', 'key1');
    errorOnce(true, 'Message 2', 'error', 'key2');
    errorOnce(true, 'Message 1 again', 'error', 'key1'); // Should not log

    expect(errorSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenNthCalledWith(1, 'Message 1');
    expect(errorSpy).toHaveBeenNthCalledWith(2, 'Message 2');
  });
});
