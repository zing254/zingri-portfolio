import { describe, it, expect } from 'vitest';
import { verifyAuth } from '@/lib/auth';

describe('verifyAuth', () => {
  it('returns false when ADMIN_SECRET not set', () => {
    const original = process.env.ADMIN_SECRET;
    delete process.env.ADMIN_SECRET;
    const request = new Request('http://localhost', {
      headers: { 'x-admin-secret': 'test' },
    });
    expect(verifyAuth(request)).toBe(false);
    process.env.ADMIN_SECRET = original;
  });

  it('returns true with correct secret', () => {
    const original = process.env.ADMIN_SECRET;
    process.env.ADMIN_SECRET = 'correct-secret';
    const request = new Request('http://localhost', {
      headers: { 'x-admin-secret': 'correct-secret' },
    });
    expect(verifyAuth(request)).toBe(true);
    process.env.ADMIN_SECRET = original;
  });

  it('returns false with incorrect secret', () => {
    const original = process.env.ADMIN_SECRET;
    process.env.ADMIN_SECRET = 'correct-secret';
    const request = new Request('http://localhost', {
      headers: { 'x-admin-secret': 'wrong' },
    });
    expect(verifyAuth(request)).toBe(false);
    process.env.ADMIN_SECRET = original;
  });
});