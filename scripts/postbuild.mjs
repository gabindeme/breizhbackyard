// After `react-router build`: turn the pre-rendered catch-all page into build/client/404.html,
// which Vercel serves (with a 404 status) for any URL that has no file.
import { copyFileSync, existsSync, rmSync } from "node:fs";

const src = "build/client/404/index.html";
if (!existsSync(src)) {
  console.error(`postbuild: ${src} is missing (is "/404" still in react-router.config.ts prerender?)`);
  process.exit(1);
}
copyFileSync(src, "build/client/404.html");
rmSync("build/client/404", { recursive: true });
console.log("postbuild: wrote build/client/404.html");
