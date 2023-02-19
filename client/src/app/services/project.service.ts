import { Injectable, EventEmitter } from "@angular/core";
import { IChild } from "../components/ichild";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { INewFileFormValues } from "../components/new-file-form/new-file-form.component";
import { IPrimitive } from "../components/iprimitive-child";
import { IpcService } from "./ipc.service";

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

  public isRoot: boolean = this.targetObject === this.project;

  public Icons = {
    mapIcon: __dirname + "/assets/icons8-map-64.png",
    docIcon: __dirname + "/assets/icons8-document-64.png",
    picIcon: __dirname + "/assets/icons8-camera-64.png",
    upArrowIcon: __dirname + "/assets/icons8-up-squared-50.png"
  };

  constructor(
    private ipc: IpcService) {
    this.ipc.on("newProjectFile")
    .subscribe((next: IChild) => {
      this.project = next;
      this.targetObject = this.project;
      console.log(this.project);
      this.emitTarget();
    });
  }

  public targetIsRoot(): boolean {
    return this.targetObject.location.left === "0px"
    && this.targetObject.location.top === "0px"
    && this.targetObject.path === this.project.path;
  }

  public traverseTree(arr: number[]): void {
    this.targetObject = this.project;
    for (const idx of arr) {
      this.targetObject = this.targetObject.children[arr[idx]];
    }
    this.emitTarget();
  }

  public setParentAsTarget(): void {
    if (this.targetIsRoot()) { return; }
    const parentAncestry = this.targetObject.ancestry.slice(0, (this.targetObject.ancestry.length - 1));
    this.traverseTree(parentAncestry);
  }

  public selectChild(idx: number): void {
    this.targetObject = this.targetObject.children[idx];
    this.targetObject$.next(this.targetObject);
  }

  public addChild(formValue$: EventEmitter<INewFileFormValues>, context$: EventEmitter<IPrimitive>): void {
    combineLatest(context$, formValue$)
      .pipe(take(1))
      .subscribe(
        (latest: [IPrimitive, INewFileFormValues]) => {
          const formValue: INewFileFormValues = latest[1];
          const context: IPrimitive = latest[0];
          if (formValue.path.length < 4) { return; }
          const child: IChild = {
            index: this.targetObject.children.length,
            ancestry: [],
            children: [],
            description: formValue.description,
            iconPath: this.Icons[`${context.type}Icon`],
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

  public updateTarget(key: string, value: any): void {
    this.targetObject[`${key}`] = value;
  }

  public removeChild(child: IChild): void {
    delete this.targetObject.children[child.index];
  }

  public emitTarget(): void {
    this.targetObject$.next(this.targetObject);
  }

  public listenForSave(projectName$: Subject<string>): void {
    const responseObject: {name: string, project: IChild} = {
      name: this.project.name,
      project: this.project
    };
    projectName$.subscribe(next => responseObject.name = next);
    this.ipc.respondOn("save", "project file", responseObject);
  }
}
