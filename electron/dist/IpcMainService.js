"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const electron_1 = require("electron");
const DialogService_1 = require("./DialogService");
class IIpcService {
    constructor() {
        this.listen();
    }
    initiateSaveFile() {
        let project$;
        console.log("initiate save");
        electron_1.ipcMain.on("project file", (event, project) => {
            console.log(project);
            project$ = rxjs_1.of(project);
        });
        electron_1.webContents.send("save");
        return project$;
    }
    listen() {
        this.listenForImportFile();
        this.listenForNewProject();
        this.listenForSelectDir();
    }
    getFileName(str) {
        return str.split("\\").pop().split("/").pop();
    }
    ;
    listenForSelectDir() {
        electron_1.ipcMain.on("select working dir", event => {
            DialogService_1.dialogService.selectFolder().subscribe(path => event.reply("select working dir", path));
        });
    }
    listenForImportFile() {
        electron_1.ipcMain.on("import file", event => {
            DialogService_1.dialogService.selectFile().subscribe(path => {
                event.reply("import file", path);
            });
        });
    }
    listenForNewProject() {
        electron_1.ipcMain.on("new project", event => {
            DialogService_1.dialogService.createFolder().subscribe(path => event.reply("new project", path));
        });
    }
}
exports.ipc = new IIpcService();
