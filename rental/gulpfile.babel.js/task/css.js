import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import concat from "gulp-concat"; // объединяет все файлы стилей в один
import cssimport from "gulp-cssimport"; // порядок рсположения стилей import файла
import autoprefixer from "gulp-autoprefixer"; // добавляет префиксы для работы с разными браузерами
import csso from "gulp-csso"; // сжимает все стили в конечном файле
import rename from "gulp-rename"; // изменяет имя конечного файла
import size from "gulp-size";
import groupCssMediaQueries from "gulp-group-css-media-queries"; // группирует media выражения

// Обработка CSS
const css = () => {
    return gulp
        .src(path.css.src, { sourcemaps: app.isDev })
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "CSS",
                    message: error.message,
                })),
            }),
        )
        .pipe(concat("main.css"))
        .pipe(cssimport())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(size({ title: "main.css" }))
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev })) // soursemaps: true показывает в каком файлы указаны стили
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }));
};

export default css;
