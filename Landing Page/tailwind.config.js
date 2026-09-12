/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-brand-(green|red|orange|brown|yellow|blue|sky)/,
      variants: ['hover', 'group-hover'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        'primary': '#2C3A8C',      // Custom Primary Color
        'primary-rose': '#2C3A8C',
        'secondary': '#A59381',
        'secondary-beige': '#A59381',
        'bg-light': '#EFE7DF',
        'bg-soft': '#F5EEEC',
        'soft': '#EAE0D5',
        'text-dark': '#3E3A36',
        'accent-red': '#EF4444',
        'accent-green': '#22C55E',
        'inst-pink': '#FDF2F0',
        'inst-blue': '#2C3A8C',
        'inst-green': '#006738',
        'inst-yellow': '#E8BD63',
        // Exact SDG Logo Colors
        'brand-green': '#2D9A47',   // Deep vibrant green
        'brand-red': '#C5282F',     // Deep vibrant red
        'brand-orange': '#E56D24',  // Vibrant orange
        'brand-yellow': '#F0B823',  // Golden yellow
        'brand-blue': '#2C3A8C',    // Custom Brand Blue from user
        'brand-sky': '#349FCC',     // Light sky blue

      }
    },
  },
  plugins: [],
}
