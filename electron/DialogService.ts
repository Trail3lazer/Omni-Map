import { dialog } from "electron";
import { from } from "rxjs";

class IDialogService {

    public selectFile() {
        return from(
            dialog.showOpenDialog(
            {
                title: "Select file to import to project",
                buttonLabel: "Attach",
                properties: ["openFile"],
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                return actual.filePaths[0]
            } else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err)));
    }

    public selectFolder() {
        return from(
            dialog.showOpenDialog(
            {
                title: "Select project folder",
                buttonLabel: "Select",
                properties: ["openDirectory"],
            }));
    }

    public createFolder() {
        return from(
            dialog.showOpenDialog(
            {
                title: "Create project directory",
                buttonLabel: "Create",
                properties: ["createDirectory"],
                message: "Create project directory"
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                return actual.filePaths[0];
            } else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err)));
    }
}

export const dialogService: IDialogService = new IDialogService();