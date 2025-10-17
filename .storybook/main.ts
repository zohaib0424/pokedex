import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        components: path.resolve(__dirname, "../src/components"),
        pages: path.resolve(__dirname, "../src/pages"),
        types: path.resolve(__dirname, "../src/types"),
        api: path.resolve(__dirname, "../src/services"),
        assets: path.resolve(__dirname, "../src/assets"),
        constants: path.resolve(__dirname, "../src/constants"),
      };
    }
    return config;
  },
};

export default config;

