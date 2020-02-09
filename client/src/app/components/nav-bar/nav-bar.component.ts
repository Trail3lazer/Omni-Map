import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  public projectName = new FormControl("New Omni Map");
  @Input() public targetIsRoot: boolean;
  @Input() public upArrow: string;
  @Output() public moveUpTree$: EventEmitter<void> = new EventEmitter();
  @Output() public projectName$: BehaviorSubject<string> = new BehaviorSubject(this.projectName.value);

  ngOnInit() {
    this.projectName.valueChanges.subscribe(
      change => {
        this.projectName$.next(change);
      });
  }

  public moveUpTree(): void {
    this.moveUpTree$.next();
  }
}
