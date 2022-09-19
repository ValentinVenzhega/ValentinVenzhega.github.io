import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin"; // сжимает изображения
import newer from "gulp-newer"; //обновляет только те файлы, которые были изменены
import gulpif from "gulp-if"; // использовние условия

// Обработка Image
const img = () => {
    return gulp
        .src(path.img.watch)
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "Image",
                    message: error.message,
                })),
            }),
        )
        .pipe(newer(path.img.dest))
        .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
        .pipe(gulp.dest(path.img.dest));
};

export default img;
