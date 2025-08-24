/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#111827',         // Main background (slate-900)
        'brand-dark-light': '#1F2937',    // Card/section background (slate-800)
        'brand-dark-lighter': '#374151',  // Borders and light backgrounds (slate-700)
        'brand-gray': '#9CA3AF',          // Secondary text (slate-400)
        'brand-light-gray': '#D1D5DB',    // Main text (slate-300)
        'brand-white': '#F9FAFB',         // Titles and important text (slate-50)
        'brand-blue': '#2563EB',          // Accent color (blue-600)
        'brand-blue-light': '#3B82F6',    // Accent color for links (blue-500)
      },
    },
  },
  plugins: [],
}