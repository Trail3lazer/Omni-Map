import { Component, OnInit } from "@angular/core";
import { Url } from "url";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
  public imgUrl: Url;
  constructor() { }

  ngOnInit() {
  }

}
