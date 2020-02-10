import { dialog, SaveDialogReturnValue, OpenDialogReturnValue, app } from "electron";
import { from, Observable } from "rxjs";

class IDialogService {

    public selectFile(): Observable<string> {
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
                return "";
            }
        }).catch(err => {console.log(err); return "";}));
    }

    public selectProjectFile() {
        return from(
            dialog.showOpenDialog(
            {
                title: "Select project",
                buttonLabel: "Select",
                properties: ["openFile"],
                defaultPath: app.getPath("documents"),
                message: "Open project file",
                filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
            }).then((actual: OpenDialogReturnValue) => {
                if (actual.filePaths.length !== 0) {
                    return actual.filePaths[0];
                };
                return "";
            }).catch(err=>{
                console.log(err);
                return "";
            }));
    }

    public saveAs(name: string): Observable<string>{
        return from(
            dialog.showSaveDialog(
            {
                title: "Choose where to save your project",
                buttonLabel: "Save",
                defaultPath: app.getPath("documents")+"/"+name,
                message: "Create project file",
                filters: [{ name: 'Omni Map Project', extensions: ['omni'] }]
            }
        ).then((actual: SaveDialogReturnValue) => {
            if (actual.filePath !== undefined) {
                let dir: string = actual.filePath;
                return dir;
            };
            return "";
        }).catch(err=>{
            console.log(err);
            return "";
        }))
    }
}

export const dialogService: IDialogService = new IDialogService();