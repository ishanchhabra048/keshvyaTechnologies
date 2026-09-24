export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', sm: '1.5rem' },
      screens: { xl: '1200px' } },
    extend: {
      colors: {
        base: 'var(--bg-base)', elevated: 'var(--bg-elevated)', surface: 'var(--surface)',
        'surface-hover': 'var(--surface-hover)', border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)', fg: 'var(--text)', 'fg-2': 'var(--text-2)',
        'fg-3': 'var(--text-3)', accent: 'var(--accent)', 'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        float: { '0%': { transform: 'translate3d(0,0,0)' },
                 '100%': { transform: 'translate3d(40px,-30px,0)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        sheen: { to: { transform: 'translateX(220%)' } },
      },
      animation: { float: 'float 20s ease-in-out infinite alternate',
                   marquee: 'marquee 30s linear infinite' },
    },
  },
};
