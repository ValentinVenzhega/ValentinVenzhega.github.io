import del from "del"; // удаляет директории

// Конфигурация
import path from "../config/path.js";

// Удалеине директории
const clear = () => {
    return del(path.root);
};

export default clear;
