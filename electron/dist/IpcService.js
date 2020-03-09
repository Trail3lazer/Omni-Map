"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Window_1 = require("./Window");
const DialogService_1 = require("./DialogService");
const ProjectService_1 = require("./ProjectService");
const operators_1 = require("rxjs/operators");
class IIpcService {
    constructor() {
        this.ipc = electron_1.ipcMain;
        this.listenForImportFile();
    }
    openFile() {
        ProjectService_1.projectService.open().subscribe(tree => Window_1.window.send("newProjectFile", tree));
    }
    initiateSaveFile() {
        this.ipc.on("project file", (event, returnValue) => {
            ProjectService_1.tree$.pipe(operators_1.take(1)).subscribe(next => {
                Window_1.window.send("newProjectFile", next);
            });
            ProjectService_1.projectService.save(returnValue.project, returnValue.name);
        });
        Window_1.window.send("save", null);
    }
    initiateSaveAsFile() {
        this.ipc.on("project file", (event, returnValue) => {
            ProjectService_1.tree$.pipe(operators_1.take(1)).subscribe(next => {
                Window_1.window.send("newProjectFile", next);
            });
            ProjectService_1.projectService.saveAs(returnValue.name, returnValue.project);
        });
        Window_1.window.send("save", null);
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
