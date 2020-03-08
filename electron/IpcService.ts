import { ipcMain } from "electron";
import { window } from "./Window";
import { dialogService } from "./DialogService";
import { IChild } from "./ichild";
import { projectService, tree$ } from "./ProjectService";
import { IpcMain } from "electron";
class IIpcService {
    private ipc: IpcMain = ipcMain;
    constructor() {
        this.listenForImportFile();
    }

    public openFile(): void {
        projectService.open().subscribe(
            tree => window.send("newProjectFile", tree)
        );
    }

    public initiateSaveFile(): void {
        this.ipc.on("project file", (event, returnValue: IProjectFileReturn) => {            
            tree$.subscribe(
                next => {
                    window.send("newProjectFile", next);
                    tree$.unsubscribe();
                }
            );
            projectService.save(returnValue.project, returnValue.name)
        });
        window.send("save", null);
    }

    public initiateSaveAsFile(): void {
        this.ipc.on("project file", (event, returnValue: IProjectFileReturn) => {
            tree$.subscribe(
                next => {
                    window.send("newProjectFile", next);
                    tree$.unsubscribe();
                }
            );
            projectService.saveAs(returnValue.name, returnValue.project)
        });
        window.send("save", null);
    }

    private listenForImportFile() {
        this.ipc.on("import file", event => {
            dialogService.selectFile().subscribe(path => {
                event.reply("import file", path);
            });
        });
    }
}

export interface IProjectFileReturn {
    project: IChild;
    name: string;
}

export const ipc: IIpcService = new IIpcService();
