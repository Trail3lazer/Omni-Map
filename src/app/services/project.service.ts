import { Injectable } from "@angular/core";
import { IChild } from "../ichild";
import { IPrimitiveChild } from "../components/iprimitive-child";
import { BehaviorSubject } from "rxjs";

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
    path: "C:/Users/jwight1/Pictures/Screenshots/Screenshot (6).png",
    children: []
  };
  private targetObject: IChild = this.project;
  public targetObject$: BehaviorSubject<IChild> = new BehaviorSubject(this.targetObject);

  constructor() {}

  public traverseTree(arr: number[]) {
    this.targetObject = this.project;
    for (const idx of arr) {
      this.targetObject = this.targetObject.children[ arr[idx] ];
    }
  }

  public selectChild(idx: number) {
    this.targetObject = this.targetObject.children[ idx ];
    this.targetObject$.next(this.targetObject);
  }

  public addChild(primitive: IPrimitiveChild) {
    const child: IChild = {
      index: this.targetObject.children.length,
      ancestry: [],
      children: [],
      description: "",
      iconPath: primitive.iconPath,
      location: primitive.location,
      name: primitive.name,
      path: primitive.path,
      type: primitive.type
    };
    child.ancestry = this.targetObject.ancestry.concat([child.index]);
    this.targetObject.children.push(child);
    console.log(this.targetObject);
  }

  public updateTarget(key: string, value: any) {
    this.targetObject[`${key}`] = value;
  }

  public removeChild(child: IChild) {
    delete this.targetObject.children[child.index];
  }
}
