import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { toTimestamp } from './toTimestamp';

describe('toTimestamp', () => {
  it('formats date correctly', () => {
    // 2023-10-05 12:34:56.789
    // month is 0-indexed, so 9 is October
    const date = new Date(2023, 9, 5, 12, 34, 56, 789);
    
    const { container } = render(toTimestamp(date));
    
    expect(container.textContent).toContain('2023-10-05 12:34:56.789');
  });

  it('pads single digits correctly', () => {
    // 2023-01-02 03:04:05.006
    const date = new Date(2023, 0, 2, 3, 4, 5, 6);
    
    const { container } = render(toTimestamp(date));
    
    expect(container.textContent).toContain('2023-01-02 03:04:05.006');
  });
});
