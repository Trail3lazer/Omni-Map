import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ParentMapService {
  private parentMap: File;

  public set setParentMap(file$: Observable<File>) {
    file$.subscribe(
      next => this.parentMap = next,
      err => console.error(err)
    );
  }

  public get getParentMap() {
    return this.parentMap;
  }
}
