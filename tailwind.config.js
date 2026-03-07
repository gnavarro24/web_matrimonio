/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dusty-olive': '#697857',
                'dark-olive': '#6b5d36',
                'dry-sage': '#a7ad89',
                'porcelain': '#fffdf7',
                'porcelain-2': '#f9f7f1',
                'black': '#000000',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Lato', 'sans-serif'],
                anastasia: ['"Anastasia Script"', 'cursive'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
                blackGold: ['"Black Gold"', 'cursive'],
            },
        },
    },
    plugins: [],
}
