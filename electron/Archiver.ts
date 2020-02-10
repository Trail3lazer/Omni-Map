import { createWriteStream, rmdirSync, readdirSync, existsSync, statSync, unlinkSync } from "fs";
import * as archiver from "archiver";
import { Archiver } from "archiver";
import * as extract from "extract-zip";

// create a file to stream archive data to.

let archive: Archiver;

export class IArchiveService {

    public open(zipPath: string) {
        this.deleteTemp()
        this.extractZip(zipPath);
    }

    public startZip(path: string): void {
        archive = archiver("zip", {
            store: true
        });
        archive.pipe(
            createWriteStream(path)
        );
    }

    public sendFilesToZip(arr: FileForZip[]): void {
        arr.forEach(val => archive.file(val.path, { name: val.name }));
    }

    public zipData(data: DataToZip): void {
        archive.append(data.text, { name: data.name });
    }

    public finishZip(): void {
        archive.finalize()
    }

    private extractZip(zipPath: string) {
        extract(zipPath, {
            dir: process.cwd() + "/temp"
        }, err => console.log(err));
    }

    private deleteTemp(): void {
        const path = process.cwd() + "/temp";
        if (existsSync(path)) {
            const files = readdirSync(path)
            if (files.length > 0) {
                files.forEach(function (filename) {
                    if (statSync(path + "/" + filename).isDirectory()) {
                        rmdirSync(path + "/" + filename)
                    } else {
                        unlinkSync(path + "/" + filename)
                    }
                })
                rmdirSync(path)
            } else {
                rmdirSync(path)
            }
        }
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