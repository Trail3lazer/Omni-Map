import { Injectable } from "@angular/core";
import { IpcService } from "./ipc.service";
import { Subject, Observable } from "rxjs";
import { Event } from "electron";

export interface IFilePaths {
  fileName: string;
  path: string;
}

export interface IImportReturn {
  0: Event;
  1: IFilePaths;
}

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private ipc: IpcService) { }
  public directory: Subject<string> = new Subject();

  public importFile(): Observable<string> {
    this.ipc.send("import file");
    return this.ipc.on("import file");
  }
  public selectDir() {
    this.ipc.send("select working dir");
    return this.ipc.on("select working dir");
  }
  public newProject() {
    this.ipc.send("new project");
    return this.ipc.on("new project");
  }
}
