import { configure } from "@storybook/react";
// import '!style-loader!css-loader!sass-loader!../assets/styles/index.scss'
import "reset-css";
import "normalize.css";
// import '!style-loader!css-loader!sass-loader!font-awesome/scss/font-awesome.scss'

import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "@storybook/addon-console";

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
  backgrounds: [
    { name: "default", value: "#fff", default: true },
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" }
  ]
});

// const req = require.context('../src', true, /.stories.js$/)

// function loadStories() {
//   req.keys().forEach(filename => req(filename))
// }

// configure(loadStories, module)
