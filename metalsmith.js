import "dotenv/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Metalsmith from "metalsmith";
import layouts from "@metalsmith/layouts";
import collections from "@metalsmith/collections";
import browserSync from "browser-sync";
import htmlMinifier from "metalsmith-html-minifier";
import pagination from "metalsmith-pagination";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env["NODE_ENV"] === "production";

let devServer = null;
let startTime = performance.now();

function msBuild() {
  return Metalsmith(__dirname)
    .clean(false)
    .watch(isProduction ? false : ["layouts", "src"])
    .source("./src")
    .destination(process.env.DEST_PATH || "./build")
    .env({
      DEBUG: process.env.DEBUG,
      NODE_ENV: process.env.NODE_ENV,
    })
    .metadata({
      isProduction: process.env["NODE_ENV"] === "production",
      siteurl: process.env["APP_URL"] || "http://localhost:3000",
      sitename: "Victor Ferreira's Homepage",
      description: "Homepage de Victor Ferreira",
      abstract: "Homepage de Victor Ferreira",
      keywords: "Victor Ferreira, homepage, blog, artigos, notas",
      author: {
        name: "Victor Ferreira",
        email: "victorotavioferreira@hotmail.com",
      },
      year: {
        from: "2007",
        to: "2008",
        // to: new Date().getFullYear(),
      },
      googletagmanager: String(process.env["GOOGLE_TAG_MANAGER"]),
    })
    .use((files, metalsmith, done) => {
      setImmediate(done);
      metalsmith.match("**/*.html").forEach((file) => {
        const data = files[file];
        const date = data.date ? new Date(data.date) : new Date();
        data.isodate = date.toISOString();
        data.pubdate = date.toLocaleDateString("pt-BR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      });
    })
    .use(
      collections({
        blog: {
          metadata: {
            title: "Blog",
            description: "Meus artigos e notas",
            slug: "blog",
          },
          pattern: "blog/*.html",
          sortBy: "isodate",
          reverse: true,
          // limit: 10,
        },
        pages: {
          pattern: "*.html",
        },
      })
    )
    .use((files, metalsmith, done) => {
      setImmediate(done);
      metalsmith.match("**/*.html").forEach((file) => {
        const data = files[file];
        data.permalink = `/${data.path.replace(/\\/g, "/")}`;
        if (data.collection?.includes("blog")) {
          data.layout = "article.njk";
          data.excerpt = data.abstract;
        }
      });
    })
    .use(
      pagination({
        "collections.blog": {
          first: "index.html",
          layout: "blog.njk",
          path: "blog/page/:num.html",
          pageMetadata: {
            title: "Blog",
          },
        },
      })
    )
    .use(
      layouts({
        pattern: "**/*.html",
        default: "base.njk",
        engineOptions: {
          filters: {
            debug(value) {
              console.log(value);
              return value;
            },
          },
        },
      })
    )
    .use(
      htmlMinifier({
        minifierOptions: {
          removeComments: false,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          caseSensitive: true,
          removeRedundantAttributes: false,
        },
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
