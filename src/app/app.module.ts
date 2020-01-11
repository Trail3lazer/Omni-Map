import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartMenuComponent } from "./components/start-menu/start-menu.component";
import { ProjectComponent } from "./project/project.component";
import { RouterModule } from "@angular/router";
import { MapComponent } from "./components/map/map.component";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { LocalPipe } from "./local.pipe";

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    ProjectComponent,
    MapComponent,
    ContextMenuComponent,
    LocalPipe
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
