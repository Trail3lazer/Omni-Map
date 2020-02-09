"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Window_1 = require("./Window");
class IMain {
    constructor() {
        this.ipc = electron_1.ipcMain;
        this.startAppListeners();
    }
    startAppListeners() {
        electron_1.app.on("ready", () => Window_1.window.createWindow());
        electron_1.app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                electron_1.app.quit();
            }
        });
    }
}
exports.IMain = IMain;
exports.main = new IMain();
