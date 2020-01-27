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
            }
        }).catch(err => console.log(err)));
    }
    selectFolder() {
        return rxjs_1.from(electron_1.dialog.showOpenDialog({
            title: "Select project folder",
            buttonLabel: "Select",
            properties: ["openDirectory"],
        }));
    }
    createFolder() {
        return rxjs_1.from(electron_1.dialog.showOpenDialog({
            title: "Create project directory",
            buttonLabel: "Create",
            properties: ["createDirectory"],
            message: "Create project directory"
        }).then(actual => {
            if (actual.filePaths.length > 0) {
                return actual.filePaths[0];
            }
            else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err)));
    }
}
exports.dialogService = new IDialogService();
