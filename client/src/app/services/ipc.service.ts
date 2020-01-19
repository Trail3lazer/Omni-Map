import { Injectable, EventEmitter } from "@angular/core";
import { IpcRenderer, IpcRendererEvent } from "electron";

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

  public on(channel: string): EventEmitter<[IpcRendererEvent, any]> {
    if (!this.ipc) {
      return;
    }
    const ipcResponse: EventEmitter<[IpcRendererEvent, any]> = new EventEmitter();
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
