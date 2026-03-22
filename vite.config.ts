import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vinext()],
  ssr: {
    target: "webworker",
  },
  define: {
    "process.env.RUNTIME_TARGET": JSON.stringify("cloudflare"),
  },
});
