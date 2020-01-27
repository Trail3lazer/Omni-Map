import { BrowserWindow, Menu as ElectronMenu, ipcRenderer, webContents } from "electron";
import * as url from "url";
import { menu } from "./Menu";

let mainWindow: BrowserWindow;

export class IWindow {

    public createWindow() {
        mainWindow = new BrowserWindow({
            width: 1000,
            height: 700,
            webPreferences: {
                nodeIntegration: true
            }
        });

        mainWindow.loadURL(
            url.format({
                pathname: `../client/dist/index.html`,
                protocol: "file:",
                slashes: true
            })
        );

        mainWindow.setMenu(ElectronMenu.buildFromTemplate(menu.template));

        mainWindow.webContents.openDevTools();

        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    }

    public send(channel: string, payload: any) {
        mainWindow.webContents.send(channel, payload)
    }

    public on(event, callback: any) {
        mainWindow.webContents.on(event, callback)
    }
}

export const window = new IWindow();