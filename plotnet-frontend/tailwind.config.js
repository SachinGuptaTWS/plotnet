/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary:       '#0F172A',
        secondary:     '#1E293B',
        surface:       '#F8FAFC',
        card:          '#FFFFFF',
        border:        '#E2E8F0',
        muted:         '#64748B',
        body:          '#334155',
        accent:        '#0EA5E9',
        success:       '#16A34A',
        'success-bg':  '#DCFCE7',
        warning:       '#D97706',
        'warning-bg':  '#FEF3C7',
        danger:        '#DC2626',
        'danger-bg':   '#FEE2E2',
        'neutral-bg':  '#F1F5F9',
        'neutral-text':'#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
};
