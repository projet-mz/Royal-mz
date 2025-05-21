export const theme = {
  colors: {
    primary: '#0F3460',
    secondary: '#FFD700',
    accent: '#4A1D75',
    success: '#2E8B57',
    warning: '#FFA000',
    error: '#D32F2F',
    background: '#F5F7FA',
  },
  typography: {
    fontFamily: {
      heading: 'Montserrat, sans-serif',
      body: 'Inter, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme; 