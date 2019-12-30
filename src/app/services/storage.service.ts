import { Injectable } from "@angular/core";
import * as fs from "fs";
import { app } from "electron";
import { ProjectService } from "./parent-map.service";

@Injectable({
  providedIn: "root"
})
export class StorageService {

  private currentPath = app.getPath("appData");

  constructor(
    private projectService: ProjectService
    ) { }

  public saveTree() {
    fs.writeFile(
      this.currentPath + "/projectTree.file",
      JSON.stringify(this.projectService.getTarget),
      err => console.log(err)
    );
  }
}
