import type { Preview } from "@storybook/react";
import '../src/assets/index.css'; // replace with the name of your tailwind css file
import { withThemeByClassName } from '@storybook/addon-themes';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


/* snipped for brevity */

export const decorators = [withThemeByClassName({
  themes: {
    light: 'light',
    dark: 'dark',
  },
  defaultTheme: 'light',
}), withThemeByClassName({
    themes: {
        // nameOfTheme: 'classNameForTheme',
        light: '',
        dark: 'dark',
    },
    defaultTheme: 'light',
})];

export default preview;
