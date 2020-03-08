import { Injectable, EventEmitter } from "@angular/core";
import { IpcRenderer } from "electron";

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

  public on(channel: string): EventEmitter<string> {
    if (!this.ipc) {
      return;
    }
    const ipcResponse: EventEmitter<string> = new EventEmitter();
    this.ipc.on(channel, (event, anything) => {
      ipcResponse.next(anything);
    });
    return ipcResponse;
  }

  public respondOn(channel: string, responseChannel: string, response: any) {
    this.ipc.on(channel, () => {
      this.send(responseChannel, response);
    });
  }

  public send(channel: string, ...args: any[]): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }
}
