import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { ProjectService } from "src/app/services/project.service";
import { IChild } from "src/app/components/ichild";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { INewFileFormValues } from "../new-file-form/new-file-form.component";
import { IPrimitive } from "../iprimitive-child";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  public contextmenu: { x: number, y: number } = { x: 0, y: 0 };
  public showContextMenu = false;
  public contextMenuValue$ = new EventEmitter();
  public newFileForm = false;
  public newFileFormValue$ = new EventEmitter();
  public targetObj$: Observable<IChild> = this.projectService.targetObject$
  .pipe(
    tap(() => this.changeDirector.markForCheck())
  );
  public upArrow: string = this.projectService.Icons.upArrowIcon;
  private projectName$: Subject<string> = new Subject();

  constructor(
    private projectService: ProjectService,
    private changeDirector: ChangeDetectorRef) { }

  ngOnInit() {
    this.projectService.listenForSave(this.projectName$);
  }

  public nameChange(name: string): void {
    this.projectName$.next(name);
  }

  public targetIsRoot(): boolean { return this.projectService.targetIsRoot(); }

  public mapClick = (event: MouseEvent) => {
    this.contextmenu = {
      x: event.pageX,
      y: event.pageY
    };
    this.showContextMenu = true;
  }

  public closeForm(values: INewFileFormValues) {
    this.newFileForm = false;
    this.newFileFormValue$.emit(values);
  }

  public closeContextMenu = (context: IPrimitive) => {
    this.showContextMenu = false;
    this.newFileForm = true;
    this.projectService.addChild(this.newFileFormValue$, this.contextMenuValue$);
    this.contextMenuValue$.emit(context);
  }

  public iconClick = (type: string, childIndex: any) => {
    if (type === "map") {
      if (this.newFileForm) {this.newFileForm = false; }
      this.projectService.selectChild(childIndex);
    }
  }

  public moveUpTree() {
    this.projectService.setParentAsTarget();
  }
}
