"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const DialogService_1 = require("./DialogService");
const Window_1 = require("./Window");
const ProjectService_1 = require("./ProjectService");
class IIpcService {
    constructor() {
        this.listen();
    }
    initiateSaveFile() {
        let project$;
        electron_1.ipcMain.on("project file", (event, [project]) => {
            let newProjectFile = ProjectService_1.projectService.save(project);
            Window_1.window.send("newProjectFile", newProjectFile);
        });
        Window_1.window.send("save", null);
    }
    listen() {
        this.listenForImportFile();
        this.listenForNewProject();
        this.listenForSelectDir();
    }
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
