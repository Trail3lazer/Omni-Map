import {  } from "jszip";
import { createWriteStream, WriteStream } from "fs";
import archiver = require('archiver');

// create a file to stream archive data to.

let archive: ;

export class IArchiveService {

    public open(path: string) {
        archive
    }

    public start(path: string) {
        this.restartArchive()
        const newZip = createWriteStream(path)
        this.pipeStream(newZip);
    }

    public sendFilesToZip(arr: FileForZip[]): void {
        arr.forEach(val => archive.file(val.path, {name: val.name}))
    }

    public zipData(data: DataToZip) {
        archive.append(data.text, {name: data.name})
    }

    public finish(): void {
        archive.finalize();
    }
    
    private pipeStream(stream: WriteStream): void {
        archive.pipe(stream)
    }

    private restartArchive(): void {
        archive = archiver('zip', {
            zlib: { level: 0 }
          });
    }
}

export const ArchiveService = new IArchiveService();

export interface FileForZip {
    path: string, 
    name: string
}

export interface DataToZip {
    text: string,
    name: string
}