import { describe, it, expect } from 'vitest';
import { safeStringify } from './safeStringify';

describe('safeStringify', () => {
  it('handles simple objects', () => {
    // GIVEN
    const obj = { a: 1, b: 'test' };

    // WHEN
    const result = safeStringify(obj);

    // THEN
    expect(result).toBe(JSON.stringify(obj, null, 2));
  });

  it('handles circular references', () => {
    // GIVEN
    const obj: any = { name: 'circular' };
    obj.self = obj;

    // WHEN
    const result = safeStringify(obj);

    // THEN
    expect(result).toContain('"self": "[Circular]"');
  });

  it('handles Error objects', () => {
    // GIVEN
    const error = new Error('Test error');

    // WHEN
    const result = safeStringify(error);

    // THEN
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('message', 'Test error');
    expect(parsed).toHaveProperty('stack');
  });

  it('handles DOM elements (mocked)', () => {
    // GIVEN
    const div = document.createElement('div');
    div.id = 'my-id';
    div.className = 'class1 class2';

    // WHEN
    const result = safeStringify(div);

    // THEN
    expect(result).toBe('"<div#my-id.class1.class2>"');
  });

  it('handles null', () => {
    // WHEN
    const result = safeStringify(null);

    // THEN
    expect(result).toBe('null');
  });
});
