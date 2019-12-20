import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private project: File;

  public set setProject(file$: Observable<File>) {
    file$.subscribe(
      next => this.project = next,
      err => console.error(err)
    );
  }

  public get getProject() {
    return this.project;
  }
}
