import { app, BrowserWindow } from "electron";
import { window } from "./Window";

export class IMain {
  public mainWindow: BrowserWindow;
  public app = app;

  constructor() {
    this.startAppListeners();
  }

  public startAppListeners() {
    app.on("ready", window.createWindow);
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") { app.quit(); }
    });
    app.on("activate", () => {
      if (this.mainWindow === null) { window.createWindow(); }
    });
  }
}

export const main : IMain = new IMain();
export const App = app;