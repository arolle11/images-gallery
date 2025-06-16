import { defineConfig } from "rasengan";
import { rasengan } from "rasengan/plugin";
import { configure } from "@rasenganjs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        tailwindcss(),
        rasengan({
          adapter: configure(),
        }),
      ],
    },
  };
});
