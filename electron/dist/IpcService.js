"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Window_1 = require("./Window");
const DialogService_1 = require("./DialogService");
const ProjectService_1 = require("./ProjectService");
class IIpcService {
    constructor() {
        this.ipc = electron_1.ipcMain;
        this.listen();
    }
    openFIle() {
        DialogService_1.dialogService.selectFile().subscribe(next => {
            Window_1.window.send("newProjectFile", tree);
        });
    }
    initiateSaveFile() {
        this.ipc.on("project file", (event, returnValue) => {
            const newProjectFile$ = ProjectService_1.projectService.save(returnValue.project, returnValue.name);
            newProjectFile$.subscribe(next => {
                Window_1.window.send("newProjectFile", next);
            });
        });
        Window_1.window.send("save", null);
    }
    listen() {
        this.listenForImportFile();
        this.listenForSelectDir();
    }
    listenForSelectDir() {
        this.ipc.on("select working dir", event => {
            DialogService_1.dialogService.selectFolder().subscribe(path => event.reply("select working dir", path));
        });
    }
    listenForImportFile() {
        this.ipc.on("import file", event => {
            DialogService_1.dialogService.selectFile().subscribe(path => {
                event.reply("import file", path);
            });
        });
    }
}
exports.ipc = new IIpcService();
