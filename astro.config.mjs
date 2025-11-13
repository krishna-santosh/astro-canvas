// @ts-check

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  // Change this to your deployment url
  site: "https://canvas.krish.fyi",
  prefetch: true,
  integrations: [icon(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
