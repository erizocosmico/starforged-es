import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            titles: ['"Exo 2"', 'sans-serif'],
            mono: ['monospace'],
        },
        colors,
    },
    plugins: [],
};
