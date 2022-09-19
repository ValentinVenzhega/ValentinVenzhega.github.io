import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import groupCssMediaQueries from "gulp-group-css-media-queries";
// import sass = require("gulp-sass")(require("sass"));
import dartSass from "sass"; // компилятор sass
import gulpSass from "gulp-sass"; // сам плагин gulp-sass
const sass = gulpSass(dartSass);

// Обработка SCSS
const scss = () => {
    return gulp
        .src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "SCSS",
                    message: error.message,
                })),
            }),
        )
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(size({ title: "main.css" }))
        .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }));
};

export default scss;
