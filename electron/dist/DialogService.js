"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const rxjs_1 = require("rxjs");
class IDialogService {
    selectFile() {
        return rxjs_1.from(electron_1.dialog.showOpenDialog({
            title: "Select file to import to project",
            buttonLabel: "Attach",
            properties: ["openFile"],
        }).then(actual => {
            if (actual.filePaths.length > 0) {
                return actual.filePaths[0];
            }
            else {
                console.log("no paths returned");
                return "";
            }
        }).catch(err => { console.log(err); return ""; }));
    }
    selectProjectFile() {
        return rxjs_1.from(electron_1.dialog.showOpenDialog({
            title: "Select project",
            buttonLabel: "Select",
            properties: ["openFile"],
            defaultPath: electron_1.app.getPath("documents"),
            message: "Open project file",
            filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
        }).then((actual) => {
            if (actual.filePaths.length !== 0) {
                return actual.filePaths[0];
            }
            ;
            return "";
        }).catch(err => {
            console.log(err);
            return "";
        }));
    }
    saveAs(name) {
        return rxjs_1.from(electron_1.dialog.showSaveDialog({
            title: "Choose where to save your project",
            buttonLabel: "Save",
            defaultPath: electron_1.app.getPath("documents") + "/" + name,
            message: "Create project file",
            filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
        }).then((actual) => {
            if (actual.filePath !== undefined) {
                let dir = actual.filePath;
                return dir;
            }
            ;
            return "";
        }).catch(err => {
            console.log(err);
            return "";
        }));
    }
}
exports.dialogService = new IDialogService();
