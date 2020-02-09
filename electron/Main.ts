import { app, ipcMain } from "electron";
import { window } from "./Window";
import { IpcMain } from "electron";



export class IMain {

  constructor() {
    this.startAppListeners();
  }
  public ipc: IpcMain = ipcMain;

  public startAppListeners() {
    app.on("ready", ()=> window.createWindow());
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") { app.quit(); }
    });
  }
}

export const main : IMain = new IMain();
