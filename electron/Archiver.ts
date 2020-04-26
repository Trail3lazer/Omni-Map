import { constants, createWriteStream, rmdirSync, readdirSync, statSync, unlink, access, mkdirSync } from "fs";
import * as archiver from "archiver";
import { Archiver } from "archiver";
import * as extract from "extract-zip";
import { bindNodeCallback, of, from, Observable, concat } from "rxjs";
import { catchError, map, tap } from "rxjs/operators"

// create a file to stream archive data to.

let archive: Archiver;

export class IArchiveService {

    public async open(zipPath: string) {
        try {
            await this.extractZip(zipPath);
        } catch (err) {
            console.log(err);
        }

    }

    public async cleanPath(path: string): Promise<void> {
        return new Promise(resolve => {
            try {
                access(path, () =>
                    unlink(path, () => resolve())
            )} catch (err) {
                console.log(err);
            };
        })
    }

    public startZip(): void {
        archive = archiver("zip", {
            store: true,
            readableObjectMode: true
        });
    }

    public async sendFilesToZip(arr: FileForZip[]): Promise<void> {
        arr.forEach(async (val: FileForZip) => {
            archive = archive.file(val.path, { name: val.name })
        })
    }

    public zipData(data: DataToZip): void {
        archive = archive.append(data.text, { name: data.name });
    }

    public async finishZip(path: string): Promise<void> {
        const stream = createWriteStream(path)
        archive.pipe(stream, { end: true });
        await archive.finalize();
        await new Promise(resolve => stream.end(() => resolve()));
    }

    private extractZip(zipPath: string): Promise<void> {
        try {
            mkdirSync(process.cwd() + "/temp", { recursive: true })
        } catch (e) { "File already exists" };
        return new Promise(resolve =>
            extract(zipPath, { dir: process.cwd() + "/temp" }, err => {
                if (err) console.log(err);
                resolve();
            }))
    }

    // private deleteTemp() {
    //     const path = process.cwd() + "/temp";
    //     try {
    //         accessSync(path, constants.W_OK | constants.R_OK)
    //         const files = readdirSync(path)
    //         if (files.length > 0) {
    //             files.forEach(function (filename) {
    //                 if (statSync(path + "/" + filename).isDirectory()) {
    //                     rmdirSync(path + "/" + filename)
    //                 } else {
    //                     unlinkSync(path + "/" + filename)
    //                 }
    //             })
    //             rmdirSync(path)
    //             return;
    //         } else {
    //             rmdirSync(path)
    //             return;
    //         }
    //     } catch { 
    //         console.log("no access in deleteTemp")
    //         return;
    //     }
    // }
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