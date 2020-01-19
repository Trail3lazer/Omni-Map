import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DialogService } from "src/app/services/dialog.service";

export interface INewFileFormValues {
  name: string;
  description: string;
  path: string;
}

@Component({
  selector: "app-new-file-form",
  templateUrl: "./new-file-form.component.html",
  styleUrls: ["./new-file-form.component.css"]
})
export class NewFileFormComponent {
  @Input() public showForm: boolean;
  @Output() public formValue$ = new EventEmitter<INewFileFormValues>();

  public info: FormGroup = new FormGroup({
    name: new FormControl(""),
    displayName: new FormControl(false),
    description: new FormControl(""),
    type: new FormControl("")
  });

  public filePath = "";
  private get formValue() {
    return {
      ...this.info.value,
      path: this.filePath
    };
  }

  constructor(
    private dialogService: DialogService,
    private changeDirector: ChangeDetectorRef
) { }

  public selectFile() {
    this.dialogService.importFile().subscribe(
      arr => {
        this.filePath = arr[1].path;
        setTimeout( () => this.changeDirector.markForCheck(), 500);
      });
  }

  public submitClicked() {
    this.formValue$.emit(this.formValue);
  }
}
