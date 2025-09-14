export const BRAND = {
  siteName: "BluecraneCreatives Ltd",
  tagline: "Transforming Ideas into Digital Excellence",
  description: "Enterprise-grade IT solutions that scale with your business. From cloud infrastructure to cybersecurity, we deliver reliable technology that drives growth.",
  
  // Enhanced color system
  colors: {
    primary: {
      25: '#f8faff',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      25: '#fafafa',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    accent: {
      50: '#ecfeff',
      100: '#cffafe',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Design tokens
  spacing: {
    section: 'py-20 lg:py-32',
    sectionSm: 'py-16 lg:py-24',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    containerSm: 'container mx-auto px-4 max-w-4xl',
  },
  
  // Typography system
  typography: {
    display: {
      1: 'text-5xl lg:text-8xl font-bold tracking-extra-tight leading-extra-tight font-display',
      2: 'text-4xl lg:text-7xl font-bold tracking-tight leading-super-tight font-display',
      3: 'text-3xl lg:text-6xl font-bold tracking-tight font-display',
    },
    heading: {
      1: 'text-4xl lg:text-5xl font-bold tracking-tight font-display',
      2: 'text-3xl lg:text-4xl font-bold tracking-tight font-display',
      3: 'text-2xl lg:text-3xl font-semibold font-display',
      4: 'text-xl lg:text-2xl font-semibold font-display',
      5: 'text-lg lg:text-xl font-semibold font-display',
    },
    body: {
      lg: 'text-lg lg:text-xl leading-relaxed',
      base: 'text-base lg:text-lg leading-relaxed',
      sm: 'text-sm lg:text-base',
    },
    label: {
      lg: 'text-sm font-medium text-secondary-700',
      base: 'text-xs font-medium text-secondary-600',
      sm: 'text-2xs font-medium text-secondary-500',
    },
  },
  
  // Component styles
  components: {
    button: {
      primary: 'btn btn-primary',
      secondary: 'btn btn-secondary',
      outline: 'btn btn-outline',
      ghost: 'btn btn-ghost',
    },
    card: {
      default: 'card',
      hover: 'card card-hover',
      interactive: 'card card-interactive',
    },
    input: {
      default: 'input',
      large: 'input text-lg py-5',
      small: 'input text-sm py-2',
    },
  },
  
  // Shadow system
  shadows: {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
    card: 'shadow-xl shadow-secondary-900/5',
    button: 'shadow-lg shadow-primary-600/25',
    glow: 'shadow-glow',
    glowLg: 'shadow-glow-lg',
  },
  
  // Animation presets
  animations: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    scaleIn: 'animate-scale-in',
    float: 'animate-float',
    bounce: 'animate-bounce-soft',
    pulse: 'animate-pulse-soft',
    glow: 'animate-glow',
  },
  
  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700',
    accent: 'bg-gradient-to-r from-primary-600 to-accent-600',
    hero: 'bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700',
    text: 'bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent',
    subtle: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
  },
  
  // Content
  company: {
    email: 'hello@bluecraneCreatives.com',
    phone: '+254 (700) 123-456',
    address: 'Nairobi, Kenya',
    linkedin: 'https://linkedin.com/company/bluecranecreatives',
    twitter: 'https://twitter.com/bluecranecreatives',
    github: 'https://github.com/bluecranecreatives',
  },
  
  // Feature highlights
  features: {
    reliability: '99.9% Uptime SLA',
    experience: '50+ Projects Delivered',
    support: '24/7 Expert Support',
    security: 'Enterprise Security',
  },
}
