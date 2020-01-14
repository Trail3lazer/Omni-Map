import { Injectable } from "@angular/core";
import { IpcRenderer, ipcRenderer, IpcRendererEvent } from "electron";
import { bindCallback, Observable, fromEvent, Subject } from "rxjs";
import { EventEmitter } from "protractor";

@Injectable({
  providedIn: "root"
})
export class IpcService {
  private ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require("electron").ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron IPC was not loaded");
    }
  }

  public on(channel: string): Subject<[IpcRendererEvent, any]> {
    if (!this.ipc) {
      return;
    }
    const ipcResponse: Subject<[IpcRendererEvent, any]> = new Subject();
    this.ipc.on(channel, (event, anything) => {
      ipcResponse.next([event, anything]);
    });
    return ipcResponse;
  }

  public send(channel: string, ...args: any[]): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }
}
