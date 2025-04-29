module.exports = {
    content: [
        "./index.html",
        './src/**/*.{html,js,jsx,ts,tsx}', // Ensures Tailwind processes all relevant files in the src folder
    ],
    theme: {
               extend: {
                 colors: {
                    // "primary-dark": "#0a2540", // navy blue
                    // "accent": "#ff6b6b",       // coral
                    // "secondary": "#ff8787",    // lighter coral
                    // "surface": "#f8fafc",      // light background
                    // "light-gray": "#e2e8f0",   // for backup

                    primaryDark: '#1A2B4C', // navy blue color
                    accentOrange: '#FF6600', // bright orange
                    accentOrangeDark: '#CC5200', // darker orange on hover
                    surface: '#2E3A59', // optional: lighter navy background for inside cards
                    lightGray: '#F7F9FA', // page background
                    // navy: '#0B2B4B',
                    // teal: '#4CB8B3',
                    // sky: '#B4E9F3',
                    // orange: '#F26C3C',
                    // shadowOrange: '#D95629', 

                //    primaryBlue: "#143e61",   // Navy blue
                //    primaryOrange: "#dc6939", // Orange
                //    accentCyan: "#5fbfcb",    // Light teal
                //    backgroundLight: "#eef1f1", // Light background color
                 },
                 fontFamily: {
                   sans: ['Inter', 'Arial', 'sans-serif'],  // Modern sans-serif font
                   serif: ['Georgia', 'serif'],             // Serif font for contrast
                 },
                 boxShadow: {
                   glow: '0 0 20px rgba(255, 95, 95, 0.5)', // Subtle glow effect for elements
                   card: '0 4px 12px rgba(0, 0, 0, 0.1)',   // Soft shadow for cards
                 },
               },
             },
    plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//       './src/**/*.{html,js,jsx,ts,tsx}', // Ensures Tailwind processes all relevant files in the src folder
//     ],
//     theme: {
//       extend: {
//         colors: {
//           primaryBlue: "#143e61",   // Navy blue
//           primaryOrange: "#dc6939", // Orange
//           accentCyan: "#5fbfcb",    // Light teal
//           backgroundLight: "#eef1f1", // Light background color
//         },
//         fontFamily: {
//           sans: ['Inter', 'Arial', 'sans-serif'],  // Modern sans-serif font
//           serif: ['Georgia', 'serif'],             // Serif font for contrast
//         },
//         boxShadow: {
//           glow: '0 0 20px rgba(255, 95, 95, 0.5)', // Subtle glow effect for elements
//           card: '0 4px 12px rgba(0, 0, 0, 0.1)',   // Soft shadow for cards
//         },
//       },
//     },
//     plugins: [],
//   };
  

// /** @type {import('tailwindcss').Config} */
// // export default 

// export const content = [
//     './src/**/*.{html,js,jsx,ts,tsx}'
// ];
// export const theme = {
//     extend: {
//         colors: {
//             primaryBlue: "#143e61",
//             primaryOrange: "#dc6939",
//             accentCyan: "#5fbfcb",
//             backgroundLight: "#eef1f1",
//             // 'primary': '#ff5f5f',       // Bright, accessible primary color
//             // 'secondary': '#1e2a47',     // Deep blue secondary color
//             // 'accent': '#ffbc42',        // Accent color for highlights
//             // 'light-bg': '#f7fafc',      // Light background for contrast
//             // 'dark-bg': '#2d3748',       // Dark background for contrast
//             // 'highlight': '#ffdf00',     // Highlight color
//           },
//           fontFamily: {
//             sans: ['Inter', 'Arial', 'sans-serif'],  // Clean, modern font
//             serif: ['Georgia', 'serif'],             // Readable serif font for contrast
//           },
//           boxShadow: {
//             'glow': '0 0 20px rgba(255, 95, 95, 0.5)', // Subtle glow effect
//             'card': '0 4px 12px rgba(0, 0, 0, 0.1)',   // Soft shadow for cards
//           },
//     },
// };
// export const plugins = [];
  