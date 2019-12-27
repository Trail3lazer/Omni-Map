import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Icon } from "../icon";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  mapPath: string;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  coordinateArr: any[] = [];
  coordinates$: BehaviorSubject<any[]> = new BehaviorSubject(this.coordinateArr);

  constructor(/*path: string*/) {
    this.mapPath = `${/*path*/"https://www.1800contacts.com/connect/wp-content/uploads/2013/08/1800contacts-building.jpg"}`;
  }
  public mapClick = (event: MouseEvent) => {
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
  }
  public addIcon = (icon: Icon) => {
    this.contextmenu = false;
    this.coordinateArr.push( icon );
    this.coordinates$.next(this.coordinateArr);
  }
  public iconClick = (type: string, reference: any) => {
    
  }
}
