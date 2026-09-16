import { describe, it, expect, vi } from 'vitest';
import { mapConcurrently } from './mapConcurrently';

function deferred() {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe('mapConcurrently', () => {
  it('starts the next item when a worker is free while another item is still pending', async () => {
    const tasks = Array.from({ length: 3 }, deferred);
    const thirdStarted = deferred();
    const started = [];
    const run = mapConcurrently(
      tasks,
      async (task) => {
        started.push(task);
        if (task === tasks[2]) {
          thirdStarted.resolve();
        }
        return task.promise;
      },
      2,
    );

    expect(started).to.deep.equal(tasks.slice(0, 2));
    tasks[1].resolve('second');
    await thirdStarted.promise;
    expect(started).to.deep.equal(tasks);
    tasks[2].resolve('third');
    tasks[0].resolve('first');
    expect(await run).to.deep.equal(['first', 'second', 'third']);
  });

  it('handles fewer items than workers', async () => {
    const mapper = vi.fn(async (item) => item);
    expect(await mapConcurrently([1], mapper, 4)).to.deep.equal([1]);
    expect(mapper).toHaveBeenCalledTimes(1);
  });

  it('does not call the mapper for an empty list', async () => {
    const mapper = vi.fn();
    expect(await mapConcurrently([], mapper, 2)).to.deep.equal([]);
    expect(mapper).not.toHaveBeenCalled();
  });

  it.each([0, -1, 1.5, NaN, Infinity])('rejects invalid concurrency: %s', async (concurrency) => {
    await expect(mapConcurrently([1], vi.fn(), concurrency)).rejects.toThrow(
      'Concurrency must be a positive integer.',
    );
  });
});
