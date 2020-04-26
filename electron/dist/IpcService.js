"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield ProjectService_1.projectService.open();
            Window_1.window.send("newProjectFile", tree);
        });
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
        this.ipc.on("import file", (event) => __awaiter(this, void 0, void 0, function* () {
            const path = yield DialogService_1.dialogService.selectFile();
            event.reply("import file", path);
        }));
    }
}
exports.ipc = new IIpcService();
