import { Injectable } from "@angular/core";
import { IpcService } from "./ipc.service";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  public directory: Subject<string>;
  constructor(private ipc: IpcService) { }

  public importFile() {
    this.ipc.send("import file");
  }
  public selectDir() {
    let path: string;
    this.ipc.on("select working dir", (event: any, returnedPath: string) => {
      path = returnedPath;
      console.log(path);
    });
    this.ipc.send("select working dir");
    this.directory.next(path);
  }
  public newProject() {
    let path: string;
    this.ipc.on("new project", (event: any, returnedPath: string) => {
      path = returnedPath;
      console.log(path);
    });
    this.ipc.send("new project");
    this.directory.next(path);
  }
}
