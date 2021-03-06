import * as Electron from "electron";
import { ipc } from "./IpcService";

class IMenu {

  public readonly template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "file",
      role: "fileMenu",
      submenu: [
        {
          label: "Save",
          click: () => {
            ipc.initiateSaveFile();
          }
        },
        {
          label: "Open",
          click: () => {
            ipc.openFile();
          }
        },
        {
          label: "Save As",
          click: () => {
            ipc.initiateSaveAsFile()
           }
        },
        {
          label: "New Project",
          click: () => { }
        },
        {
          label: "Close",
          role: "close"
        }
      ]
    },
    {
      label: "edit",
      role: "editMenu",
      submenu: [
      ]
    },
    {
      label: "view",
      role: "viewMenu",
      submenu: [
        {
          label: "zoom in",
          role: "zoomIn"
        },
        {
          label: "zoom out",
          role: "zoomOut"
        },
        {
          label: "reset zoom",
          role: "resetZoom"
        }
      ]
    }
  ];
}

export const menu = new IMenu();
