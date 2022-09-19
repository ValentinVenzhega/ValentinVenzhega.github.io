import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel"; // для работы с последними стандартами js
import webpack from "webpack-stream"; // собирает все модули в один

// Обработка Javascript
const js = () => {
    return gulp
        .src(path.js.src, { sourcemaps: app.isDev })
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "JS",
                    message: error.message,
                })),
            }),
        )
        .pipe(babel())
        .pipe(webpack(app.webpack))
        .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }));
};

export default js;
