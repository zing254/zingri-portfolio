# Hybrid Tech Cursor Implementation Plan

## Overview
Replace the existing circle blob cursor with a hybrid tech cursor that shows different states (active, loading, triggered) with subtle animations and tech-inspired design.

## Files to Modify
- `/home/zingri/dev/zingri-portfolio-main/src/components/CustomCursor.tsx` - Main implementation
- `/home/zingri/dev/zingri-portfolio-main/src/app/layout.tsx` - Import and usage
- `/home/zingri/dev/zingri-portfolio-main/src/app/page.tsx` - Potential usage check

## Implementation Details

### 1. CustomCursor Component Updates
Replace the existing CustomCursor.tsx with enhanced version that includes:
- Hybrid design combining terminal and cyberpunk elements
- Three distinct states:
  - **Active**: Steady line with subtle pulse
  - **Loading**: Side bars expanding animation
  - **Triggered**: Center pulse animation
- Maintain existing functionality:
  - Trail effect
  - Visibility toggling
  - Click state detection
  - Hover state detection
  - Desktop-only activation

### 2. State Management Enhancements
Add state tracking for cursor states:
- `isActive`: Default state
- `isLoading`: When content is loading
- `isTriggered`: On specific interactions (clicks, hovers on interactive elements)
- Update state based on user interactions and component lifecycle

### 3. Animation Specifications
- **Active State**: Thin vertical line (4px width) with subtle glow
- **Loading State**: Horizontal bars expanding from center (width animation)
- **Triggered State**: Radial pulse from center point
- Smooth transitions between states using Framer Motion

### 4. Styling Approach
- Use CSS variables for colors (primary: cyan, secondary: purple, accent: neon green)
- Maintain existing trail effect with updated colors
- Ensure z-index remains high for visibility over all content
- Keep desktop-only media query constraint

### 5. Integration Points
- Replace existing CustomCursor import in layout.tsx
- Ensure no breaking changes to existing functionality
- Maintain responsive behavior (disabled on mobile)

## Dependencies
- Framer Motion (already installed)
- React (already used)
- No new dependencies required

## Testing Considerations
- Verify all states transition correctly
- Test on desktop only (mobile should show no cursor)
- Ensure performance isn't impacted by animations
- Confirm existing trail effect still works
- Validate click and hover state detection

## Estimated Effort
- 2-3 hours for implementation and testing