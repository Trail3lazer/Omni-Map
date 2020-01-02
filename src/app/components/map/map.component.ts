import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Icon } from "../icon";
import { ProjectService } from "src/app/services/project.service";
import { IChild } from "src/app/ichild";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  current: IChild = this.projectService.getTarget;
  mapPath: string = this.current.path;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  coordinateArr: any[] = this.current.children;
  coordinates$: BehaviorSubject<any[]> = new BehaviorSubject(this.coordinateArr);

  constructor(private projectService: ProjectService) {}

  public mapClick = (event: MouseEvent) => {
    this.contextmenuX = event.pageX;
    this.contextmenuY = event.pageY;
    this.contextmenu = true;
  }

  public addIcon = (icon: Icon) => {
    this.contextmenu = false;
    this.coordinateArr.push( icon );
    this.coordinates$.next(this.coordinateArr);
  }

  public iconClick = (type: string, reference: any) => {
    console.log(type, " ", reference);
  }
}
