import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ParentMapComponent } from "./parent-map/parent-map.component";


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  routes = [
    { path: 'test', component: ParentMapComponent },
  ];
}
