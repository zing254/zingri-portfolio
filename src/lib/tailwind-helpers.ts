export const colorMap: Record<string, { text: string; bg: string; border: string; ring: string; hoverBorder: string; groupHoverText: string }> = {
  primary:   { text: 'text-primary',   bg: 'bg-primary',   border: 'border-primary/20',   ring: 'ring-primary/20',   hoverBorder: 'hover:border-primary/50',   groupHoverText: 'group-hover:text-primary/80' },
  secondary: { text: 'text-secondary', bg: 'bg-secondary', border: 'border-secondary/20', ring: 'ring-secondary/20', hoverBorder: 'hover:border-secondary/50', groupHoverText: 'group-hover:text-secondary/80' },
  accent:    { text: 'text-accent',    bg: 'bg-accent',    border: 'border-accent/20',    ring: 'ring-accent/20',    hoverBorder: 'hover:border-accent/50',    groupHoverText: 'group-hover:text-accent/80' },
  warning:   { text: 'text-warning',   bg: 'bg-warning',   border: 'border-warning/20',   ring: 'ring-warning/20',   hoverBorder: 'hover:border-warning/50',   groupHoverText: 'group-hover:text-warning/80' },
};

export function getColorClasses(color: string) {
  return colorMap[color] || colorMap.primary;
}

export const fieldColorMap: Record<string, string> = {
  name: 'primary',
  email: 'secondary',
  subject: 'accent',
  message: 'warning',
};
