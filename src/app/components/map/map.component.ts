import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from "@angular/core";
import { ProjectService } from "src/app/services/project.service";
import { IChild } from "src/app/components/ichild";
import { BehaviorSubject } from "rxjs";
import { INewFileFormValues } from "../new-file-form/new-file-form.component";
import { IPrimitive } from "../iprimitive-child";
import { startWith } from "rxjs/operators";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  public contextmenu: { x: number, y: number } = { x: 0, y: 0 };
  public contextMenuValue$ = new EventEmitter();
  public newFileForm = false;
  public newFileFormValue$ = new EventEmitter();
  public targetObj$: BehaviorSubject<IChild> = this.projectService.targetObject$;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {}

  public mapClick = (event: MouseEvent) => {
    this.contextmenu = {
      x: event.pageX,
      y: event.pageY
    };
  }

  public closeForm(values: INewFileFormValues) {
    this.newFileForm = false;
    this.newFileFormValue$.emit(values);
  }

  public closeContextMenu = (context: IPrimitive) => {
    this.newFileForm = true;
    this.contextmenu = {
      x: 0,
      y: 0
    };
    this.projectService.addChild(this.newFileFormValue$, this.contextMenuValue$);
    this.contextMenuValue$.emit(context);
  }

  public iconClick = (type: string, childIndex: any) => {
    if (type === "map") {
      if (this.newFileForm) {this.newFileForm = false; }
      this.projectService.selectChild(childIndex);
    }
  }
}
