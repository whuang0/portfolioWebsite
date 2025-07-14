export const theme = {
  colors: {
    primary: '#00fff5',
    secondary: '#ff00ff',
    accent: '#7b2cf3',
    text: '#ffffff',
    background: '#0a0a16',
    surface: '#1a1a2e',
    surfaceDark: '#141428',
  },
  
  shadows: {
    neonPrimary: '0 0 10px var(--primary), 0 0 20px rgba(0, 255, 245, 0.5)',
    neonSecondary: '0 0 10px var(--accent), 0 0 20px rgba(123, 44, 243, 0.5)',
    subtle: '0 2px 20px rgba(0, 255, 245, 0.1)',
    medium: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    sizes: {
      h1: '1.8rem',
      h2: '2.5rem',
      body: '1.1rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '4rem',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },

  transitions: {
    default: 'all 0.3s ease',
    smooth: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },

  zIndex: {
    header: 1000,
    modal: 2000,
    tooltip: 3000,
  },
} as const;

export type Theme = typeof theme; 