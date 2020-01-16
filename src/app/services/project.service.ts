import { Injectable, EventEmitter } from "@angular/core";
import { IChild } from "../components/ichild";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { DialogService, IFilePaths } from "./dialog.service";
import { INewFileFormValues } from "../components/new-file-form/new-file-form.component";
import { Event } from "electron";
import { IPrimitive } from "../components/iprimitive-child";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private project: IChild = {
    location: { left: "0px", top: "0px" },
    iconPath: "",
    ancestry: [],
    index: 0,
    description: "",
    name: "Middle Earth",
    type: "map",
    path: "C:/Users/jwight1/Pictures/Screenshots/Screenshot (6).png",
    children: []
  };
  private targetObject: IChild = this.project;
  public targetObject$: BehaviorSubject<IChild> = new BehaviorSubject<IChild>(this.targetObject);

  public mapIcon = __dirname + "/assets/icons8-map-64.png";
  public docIcon = __dirname + "/assets/icons8-document-64.png";
  public picIcon = __dirname + "/assets/icons8-camera-64.png";

  constructor(
    private dialogService: DialogService
  ) { }

  public traverseTree(arr: number[]) {
    this.targetObject = this.project;
    for (const idx of arr) {
      this.targetObject = this.targetObject.children[arr[idx]];
    }
  }

  public selectChild(idx: number) {
    this.targetObject = this.targetObject.children[idx];
    this.targetObject$.next(this.targetObject);
  }

  public addChild(formValue$: EventEmitter<INewFileFormValues>, context$: EventEmitter<IPrimitive>) {
    combineLatest(context$, formValue$)
    .pipe(take(1))
    .subscribe(
      (latest: [ IPrimitive, INewFileFormValues ]) => {
        const formValue: INewFileFormValues = latest[1];
        const context: IPrimitive = latest[0];
        const child: IChild = {
          index: this.targetObject.children.length,
          ancestry: [],
          children: [],
          description: formValue.description,
          iconPath: this[`${context.type}Icon`],
          location: context.location,
          name: formValue.name,
          path: formValue.path,
          type: context.type
        };
        child.ancestry = this.targetObject.ancestry.concat([child.index]);
        this.targetObject.children.push(child);
        this.emitTarget();
      },
    );
  }

  public updateTarget(key: string, value: any) {
    this.targetObject[`${key}`] = value;
  }

  public removeChild(child: IChild) {
    delete this.targetObject.children[child.index];
  }

  public emitTarget() {
    this.targetObject$.next(this.targetObject);
    console.info("Emitted", this.targetObject);
  }
}
