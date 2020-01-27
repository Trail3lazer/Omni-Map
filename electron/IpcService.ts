import { Observable, of } from "rxjs";
import { ipcMain } from "electron";
import { dialogService } from "./DialogService";
import { IChild } from "./ichild";
import { window } from "./Window";
import { projectService } from "./ProjectService";

class IIpcService {

    constructor() {
        this.listen();
    }

    public initiateSaveFile(): void {
        let project$: Observable<IChild>;
        ipcMain.on("project file", (event, [project]: IChild[]): void => {
            let newProjectFile = projectService.save(project)
            window.send("newProjectFile", newProjectFile)
        });
        window.send("save", null);
    }

    private listen() {
        this.listenForImportFile();
        this.listenForNewProject();
        this.listenForSelectDir();
    }

    private listenForSelectDir() {
        ipcMain.on("select working dir", event => {
            dialogService.selectFolder().subscribe(
                path => event.reply("select working dir", path)
            );
        });
    }

    private listenForImportFile() {
        ipcMain.on("import file", event => {
            dialogService.selectFile().subscribe(
                path => {
                    event.reply("import file", path)}
            );
        });
    }

    private listenForNewProject() {
        ipcMain.on("new project", event => {
            dialogService.createFolder().subscribe(
                path => event.reply("new project", path)
            );
        })
    }
}

export const ipc: IIpcService = new IIpcService()