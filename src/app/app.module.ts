import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { ParentMapComponent } from './parent-map/parent-map.component';

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    ParentMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
