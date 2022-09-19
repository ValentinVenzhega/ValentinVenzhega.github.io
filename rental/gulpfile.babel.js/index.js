import gulp from "gulp";
import browserSync from "browser-sync";

const browser = browserSync.create();
// Конфигурация
import path from "./config/path.js";
import app from "./config/app.js";

// Задачи
import clear from "./task/clear.js";
import html from "./task/html.js";
import scss from "./task/scss.js";
import js from "./task/js.js";
import img from "./task/img.js";
import font from "./task/font.js";

// Сервер
const server = () => {
    browser.init({
        server: {
            baseDir: path.root,
        },
    });
};

// наблюдение
const watcher = () => {
    gulp.watch(path.html.watch, html).on("all", browser.reload);
    gulp.watch(path.scss.watch, scss).on("all", browser.reload);
    gulp.watch(path.js.watch, js).on("all", browser.reload);
    gulp.watch(path.img.watch, img).on("all", browser.reload);
    gulp.watch(path.font.watch, font).on("all", browser.reload);
};

const build = gulp.series(clear, gulp.parallel(html, scss, js, img, font));

const dev = gulp.series(gulp.series(build, gulp.parallel(watcher, server)));

//задача
export { html };
export { scss };
export { js };
export { img };
export { font };

// сборка
export default app.isProd ? build : dev;
