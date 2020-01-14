import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ProjectService } from "src/app/services/project.service";
import { IChild } from "src/app/components/ichild";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  public contextmenu = false;
  public contextmenuX = 0;
  public contextmenuY = 0;
  public targetObj$: BehaviorSubject<IChild> = this.projectService.targetObject$;
  public newFileForm = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {}

  public mapClick = (event: MouseEvent) => {
    this.contextmenuX = event.pageX;
    this.contextmenuY = event.pageY;
    this.contextmenu = true;
  }

  public closeMenu = () => {
    this.contextmenu = false;
  }

  public iconClick = (type: string, childIndex: any) => {
    if (type === "map") {
      this.projectService.selectChild(childIndex);
    }
  }
}
