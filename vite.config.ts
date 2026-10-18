import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Malki-salon-new/",
  build: { outDir: "dist" },
});
