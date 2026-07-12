import { describe, it, expect } from 'vitest';
import { personalInfo, socialLinks, siteConfig } from '@/lib/config';

describe('config', () => {
  it('personalInfo has required fields', () => {
    expect(personalInfo.name).toBeTruthy();
    expect(personalInfo.email).toBeTruthy();
    expect(personalInfo.location).toBeTruthy();
  });

  it('socialLinks has github URL', () => {
    const githubLink = socialLinks.find(link => link.name === 'GitHub');
    expect(githubLink).toBeDefined();
    expect(githubLink?.url).toContain('github.com');
  });

  it('siteConfig has url', () => {
    expect(siteConfig.url).toContain('http');
  });
});