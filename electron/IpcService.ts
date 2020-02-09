import { ipcMain } from "electron";
import { window } from "./Window";
import { dialogService } from "./DialogService";
import { IChild } from "./ichild";
import { projectService } from "./ProjectService";
import { IpcMain } from "electron";
class IIpcService {
    private ipc: IpcMain = ipcMain;
    constructor() {
        this.listen();
    }

    public openFIle(): void {
        dialogService.selectFile().subscribe(
            next => {
                
                window.send("newProjectFile", tree);
            }
        )
    }

    public initiateSaveFile(): void {
        this.ipc.on("project file", (event, returnValue: IProjectFileReturn) => {
            const newProjectFile$ = projectService.save(returnValue.project, returnValue.name);
            newProjectFile$.subscribe(
                next => { 
                    window.send("newProjectFile", next);
                }
            )
        });
        window.send("save", null);
    }
    private listen() {
        this.listenForImportFile();
        this.listenForSelectDir();
    }
    private listenForSelectDir() {
        this.ipc.on("select working dir", event => {
            dialogService.selectFolder().subscribe(path => event.reply("select working dir", path));
        });
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
