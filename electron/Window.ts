import { BrowserWindow, Menu as ElectronMenu } from "electron";
import * as url from "url";
import { menu } from "./Menu";

export class IWindow {

    private mainWindow: BrowserWindow;

    public createWindow() {
        this.mainWindow = new BrowserWindow({
            width: 1000,
            height: 700,
            webPreferences: {
                nodeIntegration: true
            }
        });

        
        this.mainWindow.loadURL(
            url.format({
                pathname: `../client/dist/index.html`,
                protocol: "file:",
                slashes: true
            })
        );

        this.mainWindow.setMenu(ElectronMenu.buildFromTemplate(menu.template));

        this.mainWindow.webContents.openDevTools();

        // this.mainWindow.on("closed", () => {
        //     this.mainWindow = null;
        // });
    }

    public send(channel: string, payload: any) {
        this.mainWindow.webContents.send(channel, payload)
    }

    public on(event, callback: any) {
        this.mainWindow.webContents.on(event, callback)
    }
}

export const window = new IWindow();