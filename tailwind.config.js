/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");


const withMT = require("@material-tailwind/react/utils/withMT");

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// }


module.exports=withMT({


  content: ["./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  
  ],
    theme: {
      extend: {},
    },
    plugins: [
      require('daisyui'),
      flowbite.plugin(),
    ],
    daisyui: {
      themes: ["light"],
    },



});

