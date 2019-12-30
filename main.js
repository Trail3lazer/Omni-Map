const {app, BrowserWindow} = require("electron");
const { menuBuilder } = require("./application/menu");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
      mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
          nodeIntegration: true
        }
      });

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools();

      mainWindow.on("closed", () => {
        mainWindow = null;
      });
    }

app.on("ready", createWindow);

app.on("window-all-closed", () => {
      if (process.platform !== "darwin") { app.quit(); }
    });

app.on("activate", () => {
      menuBuilder();
      if (mainWindow === null) { createWindow(); }
    });