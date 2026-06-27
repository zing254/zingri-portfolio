import { describe, it, expect } from 'vitest';

function validateField(name: string, value: string): string | null {
  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return null;
  }
  if (name === 'name' || name === 'subject') {
    if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (value.length < 2) return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters`;
    return null;
  }
  if (name === 'message') {
    if (!value) return 'Message is required';
    if (value.length < 10) return 'Message must be at least 10 characters';
    return null;
  }
  return null;
}

describe('Contact Form Validation', () => {
  it('should reject empty name', () => {
    expect(validateField('name', '')).toBe('Name is required');
  });

  it('should reject name shorter than 2 characters', () => {
    expect(validateField('name', 'A')).toBe('Name must be at least 2 characters');
  });

  it('should accept valid name', () => {
    expect(validateField('name', 'John')).toBeNull();
  });

  it('should reject empty email', () => {
    expect(validateField('email', '')).toBe('Email is required');
  });

  it('should reject invalid email format', () => {
    expect(validateField('email', 'notanemail')).toBe('Please enter a valid email');
  });

  it('should accept valid email', () => {
    expect(validateField('email', 'test@example.com')).toBeNull();
  });

  it('should reject empty message', () => {
    expect(validateField('message', '')).toBe('Message is required');
  });

  it('should reject message shorter than 10 characters', () => {
    expect(validateField('message', 'Hi')).toBe('Message must be at least 10 characters');
  });

  it('should accept valid message', () => {
    expect(validateField('message', 'Hello, I would like to discuss a project opportunity.')).toBeNull();
  });
});
