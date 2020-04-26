import { dialog, SaveDialogReturnValue, OpenDialogReturnValue, app } from "electron";
import { from, Observable } from "rxjs";

class IDialogService {

    public async selectFile(): Promise<string> {
        const actual = await dialog.showOpenDialog({
            title: "Select file to import to project",
            buttonLabel: "Attach",
            properties: ["openFile"],
        });

        if (actual.filePaths.length > 0) {
            return actual.filePaths[0]
        }
        console.log("no paths returned");
        return "";
    }

    public async selectProjectFile(): Promise<string> {
        const actual = await dialog.showOpenDialog({
            title: "Select project",
            buttonLabel: "Select",
            properties: ["openFile"],
            defaultPath: app.getPath("documents"),
            message: "Open project file",
            filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
        });

        if (actual.filePaths.length !== 0) {
            return actual.filePaths[0];
        };
        console.log("no paths returned");
        return "";
    }

    public async saveAs(name: string): Promise<string> {
        const actual = await dialog.showSaveDialog({
            title: "Choose where to save your project",
            buttonLabel: "Save",
            defaultPath: app.getPath("documents") + "/" + name,
            message: "Create project file",
            filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
        });

        if (actual.filePath !== undefined) {
            return actual.filePath
        };
        console.log("no paths returned");
        return "";
    }
}


export const dialogService: IDialogService = new IDialogService();