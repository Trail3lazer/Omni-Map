import { Component, ChangeDetectionStrategy, EventEmitter } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ProjectService } from "src/app/services/project.service";
import { IChild } from "src/app/ichild";
import { IPrimitiveChild } from "../iprimitive-child";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  public contextmenu = false;
  public contextmenuX = 0;
  public contextmenuY = 0;

  private childArr: any[];
  public coordinates$: BehaviorSubject<any[]> = new BehaviorSubject(this.childArr);

  public current$ = new EventEmitter();

  constructor(private projectService: ProjectService) {
    this.projectService.targetObject$.subscribe(
      (current: IChild) => {
        this.current$.emit(current);
        this.childArr = current.children;
      }
    );
  }

  public mapClick = (event: MouseEvent) => {
    this.contextmenuX = event.pageX;
    this.contextmenuY = event.pageY;
    this.contextmenu = true;
  }

  public addIcon = (icon: IPrimitiveChild) => {
    this.contextmenu = false;
    this.projectService.addChild(icon);
    this.coordinates$.next(this.childArr);
  }

  public iconClick = (type: string, childIndex: any) => {
    if (type === "map") {
      this.projectService.selectChild(childIndex);
    }
  }
}
