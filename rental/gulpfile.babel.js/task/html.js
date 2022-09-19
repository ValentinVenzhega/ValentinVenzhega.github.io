import gulp from "gulp";
import browserSync from "browser-sync";
const browser = browserSync.create();
// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber"; // вывод ошибок наглядно
import notify from "gulp-notify"; // создаем всплывающие сообщения об ошибках
import fileInclude from "gulp-file-include"; // подключение нескольких файлов
import htmlmin from "gulp-htmlmin"; // сжатие разметки html
import size from "gulp-size"; // смотрим размер файла

// Обработка HTML
const html = () => {
    return gulp
        .src(path.html.src)
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "HTML",
                    message: error.message,
                })),
            }),
        )
        .pipe(fileInclude())
        .pipe(size({ title: "До сжатия" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "После сжатия" }))
        .pipe(gulp.dest(path.html.dest))
        .pipe(browser.stream()); // бновляем данные точечно
};

export default html;
