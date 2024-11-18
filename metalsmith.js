import "dotenv/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Metalsmith from "metalsmith";
import layouts from "@metalsmith/layouts";
import collections from "@metalsmith/collections";
import browserSync from "browser-sync";
import * as cheerio from "cheerio";
import htmlMinifier from "metalsmith-html-minifier";

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
      isProduction: false, // process.env["NODE_ENV"] === "production",
      siteurl: process.env["APP_URL"] || "http://localhost:3000",
      sitename: "Victor Ferreira's Homepage",
      description: "Homepage de Victor Ferreira",
      abstract: "Homepage de Victor Ferreira",
      keywords: "Victor Ferreira, homepage, blog, artigos, notas",
      author: {
        name: "Victor Ferreira",
        email: "victorotavioferreira@hotmail.com",
      },
      year: { from: "2007", to: new Date().getFullYear() },
      googletagmanager: String(process.env["GOOGLE_TAG_MANAGER"]),
    })
    .use((files, metalsmith, done) => {
      setImmediate(done);
      metalsmith.match("**/*.html").forEach((file) => {
        const data = files[file];
        const $ = cheerio.load(data.contents.toString(), {}, false);
        const $date = $("time:first");
        const date = $date.text();

        if (date) {
          const pubdate = new Date(date + "T03:00:00");
          data.isodate = pubdate.toISOString();
          data.pubdate = pubdate.toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          $date.remove();
          data.contents = Buffer.from($.html());
        }
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
          limit: 10,
        },
      })
    )
    .use((files, metalsmith, done) => {
      setImmediate(done);
      metalsmith.match("**/*.html").forEach((file) => {
        const data = files[file];

        if (data.path === "index.html") data.layout = "blog.njk";

        data.permalink = data.path.replace(/\\/g, "/");

        const $ = cheerio.load(data.contents.toString(), {}, false);
        const title = $("h1").text();
        const content = $("p:first").text();
        $("h1").remove();

        data.title = title;

        if (data.collection?.includes("blog")) {
          data.layout = "article.njk";

          const maxNumberOfWords = 35;
          const listOfWords = content.trim().split(" ");
          const truncatedContent = listOfWords
            .slice(0, maxNumberOfWords)
            .join(" ");
          const excerpt = truncatedContent + "…";
          const output =
            listOfWords.length > maxNumberOfWords ? excerpt : content;
          data.excerpt = Buffer.from(output);
        }

        data.contents = Buffer.from($.html());
      });
    })
    .use(
      layouts({
        default: "base.njk",
      })
    )
    .use(
      htmlMinifier({
        minifierOptions: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
          caseSensitive: true,
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
