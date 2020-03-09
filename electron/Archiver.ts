import { constants, createWriteStream, rmdirSync, readdirSync, accessSync, statSync, unlinkSync, access, mkdirSync } from "fs";
import * as archiver from "archiver";
import { Archiver } from "archiver";
import * as extract from "extract-zip";
import {from, of, Observable} from "rxjs";

// create a file to stream archive data to.

let archive: Archiver;

export class IArchiveService {

    public async open(zipPath: string) {
        this.extractZip(zipPath);
    }

    public cleanPath(path: string): void {
            try {
                accessSync(path);
                unlinkSync(path);
            } catch {
                return;
            }
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
        archive.append(data.text, { name: "project" });
    }

    public finishZip(): Observable<void> {
        return from(archive.finalize());
    }

    private extractZip(zipPath: string):void {
        try {
            mkdirSync(process.cwd() + "/temp", { recursive: true })
        } catch (e) {console.log(e)};
        extract(zipPath, {
            dir: process.cwd() + "/temp"
        }, err => {
            console.log(err);
            return;
        });
    }

    private deleteTemp() {
        const path = process.cwd() + "/temp";
        try {
            accessSync(path, constants.W_OK | constants.R_OK)
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
                return;
            } else {
                rmdirSync(path)
                return;
            }
        } catch { 
            console.log("no access in deleteTemp")
            return;
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