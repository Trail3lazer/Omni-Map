import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { IPrimitiveChild } from "../iprimitive-child";
import { DialogService } from "src/app/services/dialog.service";
import { dialog } from "electron";

@Component({
  selector: "app-contextmenu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.css"]
})
export class ContextMenuComponent {
  map = "assets/icons8-map-64.png";
  doc = "assets/icons8-document-64.png";
  pic = "assets/icons8-camera-64.png";

  constructor(private dialogService: DialogService) { }

  @Input() x = 0;
  @Input() y = 0;
  @Output() newIcon = new EventEmitter<any>();

  public async addIcon(x: number, y: number, type: string) {
    this.dialogService.selectDir();
    const newIcon: IPrimitiveChild = {
      location: {left: `${x}px`, top: `${y}px`},
      type,
      iconPath: this[`${type}`],
    };
    this.newIcon.emit(newIcon);
  }
}
