import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartMenuComponent } from "./components/start-menu/start-menu.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MapComponent } from "./components/map/map.component";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { LocalPipe } from "./local.pipe";
import { NewFileFormComponent } from "./components/new-file-form/new-file-form.component";

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    MapComponent,
    ContextMenuComponent,
    LocalPipe,
    NewFileFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
