import { Component, OnInit } from "@angular/core";
import { Url } from "url";

@Component({
  selector: "app-parent-map",
  templateUrl: "./parent-map.component.html",
  styleUrls: ["./parent-map.component.css"]
})
export class ParentMapComponent implements OnInit {
  public imgUrl: Url;
  constructor() { }

  ngOnInit() {
  }

}
