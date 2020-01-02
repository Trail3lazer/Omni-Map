import { Injectable } from "@angular/core";
import { ProjectService } from "./project.service";
import { DialogService } from "./dialog.service";

@Injectable({
    providedIn: "root"
})
export class StorageService {
    private projectDirectory: string;

    constructor(
        private projectService: ProjectService,
        private dialogService: DialogService
    ) { }


    public saveTree() {

    }
}
