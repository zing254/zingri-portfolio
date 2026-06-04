# GitHub Projects Integration Plan

## Overview
Add all public GitHub repositories as portfolio projects by fetching data from the GitHub API and displaying them in the projects section.

## Files to Modify
- `/home/zingri/dev/zingri-portfolio-main/src/lib/config.ts` - Add GitHub configuration and fetch function
- `/home/zingri/dev/zingri-portfolio-main/src/components/Projects.tsx` - Replace static projects array with dynamic data
- `/home/zingri/dev/zingri-portfolio-main/src/app/page.tsx` - Potentially add data fetching logic
- `/home/zingri/dev/zingri-portfolio-main/src/app/api/github/route.ts` - Create new API route for GitHub data (optional)

## Implementation Details

### Approach Options:
1. **Client-side Fetching**: Fetch GitHub data directly in Projects component using useEffect
2. **Server-side Props**: Fetch at build time using getStaticProps (if using pages router) 
3. **API Route**: Create backend API route to proxy GitHub requests (avoids exposing token)
4. **Build-time Generation**: Fetch during build and store as static data

Given the current Next.js 15 App Router structure, I recommend **Option 1 (Client-side)** for simplicity, with consideration for **Option 3 (API Route)** if rate limiting becomes an issue.

### 1. Configuration Updates (config.ts)
Add:
- GitHub username configuration
- Optional token configuration for higher rate limits
- Helper function to fetch GitHub repos
- Interface for GitHub repository data

### 2. Projects Component Updates
Replace static projects array with:
- useState to hold projects data
- useEffect to fetch data on mount
- Loading state UI
- Error handling
- Mapping of GitHub repo data to project card format
- Preservation of existing UI/UX components (TiltCard, filters, etc.)

### 3. Data Mapping
Map GitHub API response to project interface:
- `name` → repo.name
- `description` → repo.description
- `tech` → extract from repo.language or topics (may need enhancement)
- `url` → repo.html_pledge
- `github` → repo.html_pledge (same as url for now)
- `stars` → repo.stargazers_count
- `status` → determine based on repo.archived, fork, etc.
- `featured` → could be based on topics or manually configured

### 4. Enhancement Considerations
- Add ability to manually feature certain repos via config
- Allow filtering by language/topic
- Handle rate limiting gracefully
- Show loading skeletons
- Cache results to prevent excessive API calls

## Dependencies
- No new dependencies required (uses existing fetch/useEffect)

## Environment Variables
- Add GITHUB_USERNAME to .env.local
- Optionally add GITHUB_TOKEN for higher rate limits

## Testing Considerations
- Verify data fetches correctly
- Check mapping accuracy
- Test loading and error states
- Ensure existing filtering and UI still works
- Validate responsive behavior
- Check that starred count displays correctly

## Estimated Effort
- 3-4 hours for implementation and testing