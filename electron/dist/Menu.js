"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IpcService_1 = require("./IpcService");
class IMenu {
    constructor() {
        this.template = [
            {
                label: "file",
                role: "fileMenu",
                submenu: [
                    {
                        label: "Save",
                        click: () => {
                            IpcService_1.ipc.initiateSaveFile();
                        }
                    },
                    {
                        label: "Open",
                        click: () => {
                            IpcService_1.ipc.openFile();
                        }
                    },
                    {
                        label: "Save As",
                        click: () => {
                            IpcService_1.ipc.initiateSaveAsFile();
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
                submenu: []
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
}
exports.menu = new IMenu();
