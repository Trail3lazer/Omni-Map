import * as fs from "fs";
import { dialog, ipcMain } from "electron";

export class Project {

    listen(): void {
        ipcMain.on("select working dir", () => {
            dialog.showOpenDialog({
                title: "Select Project Directory",
                properties: ["openDirectory"]
            });
        });
    }
}
