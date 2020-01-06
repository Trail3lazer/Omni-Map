import { Injectable } from "@angular/core";
import { IChild } from "../ichild";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private project: IChild = {
    location: { left: "0px", top: "0px"},
    iconPath: "",
    ancestry: [],
    index: 0,
    description: "",
    name: "Middle Earth",
    type: "map",
    path: "file:///C:/Users/jwight1/Pictures/Screenshots/Screenshot (6).png",
    children: []
  };
  private targetObject = this.project;

  public traverseTree(arr: number[]) {
    this.targetObject = this.project;
    for (const idx of arr) {
      this.targetObject = this.targetObject.children[ arr[idx] ];
    }
  }

  public selectChild(idx: number) {
    this.targetObject = this.targetObject.children[ idx ];
  }

  public addChild(child: IChild) {
    child.index = this.targetObject.children.length;
    child.ancestry = this.targetObject.ancestry;
    child.ancestry.push(child.index);
    this.targetObject.children.push(child);
  }

  public updateTarget(key: string, value: any) {
    this.targetObject[`${key}`] = value;
  }

  public removeChild(child: IChild) {
    delete this.targetObject.children[child.index];
  }

  public get getTarget() {
    return this.targetObject;
  }
}
