import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ParentMapService } from "src/app/services/parent-map.service";

@Component({
  selector: "app-start-menu",
  templateUrl: "./start-menu.component.html",
  styleUrls: ["./start-menu.component.css"]
})
export class StartMenuComponent implements OnInit {

  @Output() public projectFile$: EventEmitter<File> = new EventEmitter();

  constructor(private parentMapService: ParentMapService) { }
  ngOnInit() {
  }

  public newProject(event: any): void {
    this.projectFile$.emit(event);
  }

  public loadProject(event: any): void {
    this.projectFile$.emit(event);
  }

}
