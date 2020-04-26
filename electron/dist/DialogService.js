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
class IDialogService {
    selectFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const actual = yield electron_1.dialog.showOpenDialog({
                title: "Select file to import to project",
                buttonLabel: "Attach",
                properties: ["openFile"],
            });
            if (actual.filePaths.length > 0) {
                return actual.filePaths[0];
            }
            console.log("no paths returned");
            return "";
        });
    }
    selectProjectFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const actual = yield electron_1.dialog.showOpenDialog({
                title: "Select project",
                buttonLabel: "Select",
                properties: ["openFile"],
                defaultPath: electron_1.app.getPath("documents"),
                message: "Open project file",
                filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
            });
            if (actual.filePaths.length !== 0) {
                return actual.filePaths[0];
            }
            ;
            console.log("no paths returned");
            return "";
        });
    }
    saveAs(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const actual = yield electron_1.dialog.showSaveDialog({
                title: "Choose where to save your project",
                buttonLabel: "Save",
                defaultPath: electron_1.app.getPath("documents") + "/" + name,
                message: "Create project file",
                filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
            });
            if (actual.filePath !== undefined) {
                return actual.filePath;
            }
            ;
            console.log("no paths returned");
            return "";
        });
    }
}
exports.dialogService = new IDialogService();
