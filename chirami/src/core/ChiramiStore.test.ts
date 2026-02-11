import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { chiramiStore } from './ChiramiStore';

describe('ChiramiStore', () => {
  beforeEach(() => {
    chiramiStore.dispose();
    chiramiStore.init();
  });

  afterEach(() => {
    chiramiStore.dispose();
    vi.restoreAllMocks();
  });

  it('captures console.log', () => {
    // WHEN
    console.log('test log message');

    // THEN
    const logs = chiramiStore.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe('log');
    expect(logs[0].args).toEqual(['test log message']);
  });

  it('captures console.error', () => {
    // WHEN
    console.error('test error message');

    // THEN
    const logs = chiramiStore.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe('error');
    expect(logs[0].args).toEqual(['test error message']);
  });

  it('notifies listeners when log is added', () => {
    // GIVEN
    const listener = vi.fn();
    const unsubscribe = chiramiStore.subscribe(listener);
    
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith([]);

    // WHEN
    console.warn('warning');

    // THEN
    expect(listener).toHaveBeenCalledTimes(2);
    const logs = chiramiStore.getLogs();
    expect(listener).toHaveBeenLastCalledWith(logs);

    // CLEAN
    unsubscribe();
  });

  it('unsubscribes correctly', () => {
    // GIVEN
    const listener = vi.fn();
    const unsubscribe = chiramiStore.subscribe(listener);

    // WHEN
    unsubscribe();
    console.info('info');

    // THEN
    // Should verify listener not called again (except the initial one)
    expect(listener).toHaveBeenCalledTimes(1); 
  });

  it('clears logs', () => {
    // GIVEN
    console.log('to be cleared');
    expect(chiramiStore.getTotalCount()).toBe(1);

    // WHEN
    chiramiStore.clear();

    // THEN
    expect(chiramiStore.getLogs()).toEqual([]);
    expect(chiramiStore.getTotalCount()).toBe(1);
  });
  
  it('respects MAX_LOG_COUNT', () => {
    // GIVEN
    const MAX = 400;
    for (let i = 1; i <= MAX; i++) {
        console.log(`msg ${i}`);
    }

    // WHEN
    console.log('over message A');
    console.log('over message B');

    // THEN
    const logs = chiramiStore.getLogs();
    expect(logs).toHaveLength(MAX);
    expect(logs[logs.length - 1].args).toEqual([`over message B`]);
    expect(logs[0].args).toEqual([`msg 3`]);
  });
});
