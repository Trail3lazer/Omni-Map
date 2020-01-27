"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Window_1 = require("./Window");
class IMain {
    constructor() {
        this.app = electron_1.app;
        this.startAppListeners();
    }
    startAppListeners() {
        electron_1.app.on("ready", Window_1.window.createWindow);
        electron_1.app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                electron_1.app.quit();
            }
        });
        electron_1.app.on("activate", () => {
            if (this.mainWindow === null) {
                Window_1.window.createWindow();
            }
        });
    }
}
exports.IMain = IMain;
exports.main = new IMain();
exports.App = electron_1.app;
