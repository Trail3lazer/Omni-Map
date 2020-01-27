"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const url = require("url");
const Menu_1 = require("./Menu");
let mainWindow;
class IWindow {
    createWindow() {
        mainWindow = new electron_1.BrowserWindow({
            width: 1000,
            height: 700,
            webPreferences: {
                nodeIntegration: true
            }
        });
        mainWindow.loadURL(url.format({
            pathname: `../client/dist/index.html`,
            protocol: "file:",
            slashes: true
        }));
        mainWindow.setMenu(electron_1.Menu.buildFromTemplate(Menu_1.menu.template));
        mainWindow.webContents.openDevTools();
        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    }
    send(channel, payload) {
        mainWindow.webContents.send(channel, payload);
    }
    on(event, callback) {
        mainWindow.webContents.on(event, callback);
    }
}
exports.IWindow = IWindow;
exports.window = new IWindow();
