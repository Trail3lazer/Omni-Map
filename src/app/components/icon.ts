import { Component } from "@angular/compiler/src/core";

export interface Icon {
    location: {left: string, top: string};
    type: string;
    path: string;
    component: any;
}
