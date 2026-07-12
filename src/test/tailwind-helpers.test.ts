import { describe, it, expect } from 'vitest';
import { getColorClasses, colorMap } from '@/lib/tailwind-helpers';

describe('tailwind-helpers', () => {
  it('getColorClasses returns valid classes for known color', () => {
    const classes = getColorClasses('primary');
    expect(classes.text).toBe('text-primary');
    expect(classes.border).toBe('border-primary/20');
  });

  it('getColorClasses returns default for unknown color', () => {
    const classes = getColorClasses('nonexistent');
    expect(classes).toEqual(colorMap.primary);
  });
});