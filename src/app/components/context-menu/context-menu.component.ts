import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Icon } from "../icon";

@Component({
  selector: "app-contextmenu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.css"]
})
export class ContextMenuComponent {
  map = "assets/icons8-map-64.png";
  doc = "assets/icons8-document-64.png";
  pic = "assets/icons8-camera-64.png";

  constructor() { }

  @Input() x = 0;
  @Input() y = 0;
  @Output() newIcon = new EventEmitter<Icon>();

  addIcon(x: number, y: number, type: string) {
    const newIcon: Icon = {
      location: {left: `${x}px`, top: `${y}px`},
      type,
      path: this[`${type}`],
      component: ""
    };
    this.newIcon.emit(newIcon);
  }
}
