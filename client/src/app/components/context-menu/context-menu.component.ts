import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { IPrimitive } from "../iprimitive-child";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-contextmenu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.css"]
})
export class ContextMenuComponent {

  public map = this.projectService.Icons.mapIcon;
  public doc = this.projectService.Icons.docIcon;
  public pic = this.projectService.Icons.picIcon;


  @Input() x = 0;
  @Input() y = 0;
  @Output() typeClicked$ = new EventEmitter<IPrimitive>();

  constructor(private projectService: ProjectService) { }

  public async addIcon(x: number, y: number, type: string) {
    const prim: IPrimitive = {
      location: { left: `${x}px`, top: `${y}px` },
      type,
    };
    this.typeClicked$.emit(prim);
  }
}
