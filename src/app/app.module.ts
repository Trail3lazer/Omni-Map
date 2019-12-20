import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartMenuComponent } from "./components/start-menu/start-menu.component";
import { ProjectComponent } from "./project/project.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
