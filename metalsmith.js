import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import Metalsmith from "metalsmith";
import layouts from "@metalsmith/layouts";
import browserSync from "browser-sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env["NODE_ENV"] === "production";

let devServer = null;
let startTime = performance.now();

function msBuild() {
  return Metalsmith(__dirname)
    .clean(true)
    .watch(isProduction ? false : ["layouts", "src"])
    .source("./src")
    .destination("./build")
    .env({
      DEBUG: process.env.DEBUG,
      NODE_ENV: process.env.NODE_ENV,
    })
    .metadata({
      sitename: "My Static Site & Blog",
      siteurl: "http://example.com/",
      description: "It's about saying »Hello« to the world.",
      generatorname: "Metalsmith",
      generatorurl: "https://metalsmith.io/",
    })
    .use((files) => console.log("Files:", Object.keys(files)))
    .use(
      layouts({
        default: "default.njk",
      })
    );
}

const ms = msBuild();
ms.build((err) => {
  if (err) throw err;
  console.log(
    `Build success in ${((performance.now() - startTime) / 1000).toFixed(1)}s`
  );

  if (ms.watch() === false) return;
  if (devServer) {
    startTime = performance.now();
    devServer.reload();
  } else {
    devServer = browserSync.create();
    devServer.init({
      host: "localhost",
      server: "build",
      port: process.env["PORT"] || 3000,
      injectChanges: false,
      open: false,
    });
  }
});
