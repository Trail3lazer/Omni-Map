import { Injectable } from "@angular/core";
import { IChild } from "../ichild";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private project: IChild = {
    x: 0,
    y: 0,
    ancestry: [],
    index: 0,
    description: "",
    name: "Middle Earth",
    type: "map",
    path: "https://i.pinimg.com/originals/99/93/72/9993727dc7fa3809427d5f4e9eef88a4.jpg",
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
