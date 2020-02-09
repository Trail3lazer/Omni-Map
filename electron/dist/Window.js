"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const url = require("url");
const Menu_1 = require("./Menu");
class IWindow {
    createWindow() {
        this.mainWindow = new electron_1.BrowserWindow({
            width: 1000,
            height: 700,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.mainWindow.loadURL(url.format({
            pathname: `../client/dist/index.html`,
            protocol: "file:",
            slashes: true
        }));
        this.mainWindow.setMenu(electron_1.Menu.buildFromTemplate(Menu_1.menu.template));
        this.mainWindow.webContents.openDevTools();
    }
    send(channel, payload) {
        this.mainWindow.webContents.send(channel, payload);
    }
    on(event, callback) {
        this.mainWindow.webContents.on(event, callback);
    }
}
exports.IWindow = IWindow;
exports.window = new IWindow();
