import { ipcMain } from "electron";
import { window } from "./Window";
import { dialogService } from "./DialogService";
import { IChild } from "./ichild";
import { projectService, tree$ } from "./ProjectService";
import { IpcMain } from "electron";
import { take } from "rxjs/operators";
class IIpcService {
    private ipc: IpcMain = ipcMain;
    constructor() {
        this.listenForImportFile();
    }

    public async openFile(): Promise<void> {
        const tree = await projectService.open();
        window.send("newProjectFile", tree);
    }

    public initiateSaveFile(): void {
        this.ipc.on("project file", (event, returnValue: IProjectFileReturn) => {            
            tree$.pipe(take(1)).subscribe(
                next => {
                    window.send("newProjectFile", next);
                }
            );
            projectService.save(returnValue.project, returnValue.name)
        });
        window.send("save", null);
    }

    public initiateSaveAsFile(): void {
        this.ipc.on("project file", (event, returnValue: IProjectFileReturn) => {
            tree$.pipe(take(1)).subscribe(
                next => {
                    window.send("newProjectFile", next);
                }
            );
            projectService.saveAs(returnValue.name, returnValue.project)
        });
        window.send("save", null);
    }

    private listenForImportFile() {
        this.ipc.on("import file", async event => {
            const path = await dialogService.selectFile()
            event.reply("import file", path);
        });
    }
}

export interface IProjectFileReturn {
    project: IChild;
    name: string;
}

export const ipc: IIpcService = new IIpcService();
