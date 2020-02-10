"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const archiver = require("archiver");
const extract = require("extract-zip");
let archive;
class IArchiveService {
    open(zipPath) {
        this.deleteTemp();
        this.extractZip(zipPath);
    }
    startZip(path) {
        archive = archiver("zip", {
            store: true
        });
        archive.pipe(fs_1.createWriteStream(path));
    }
    sendFilesToZip(arr) {
        arr.forEach(val => archive.file(val.path, { name: val.name }));
    }
    zipData(data) {
        archive.append(data.text, { name: data.name });
    }
    finishZip() {
        archive.finalize();
    }
    extractZip(zipPath) {
        extract(zipPath, {
            dir: process.cwd() + "/temp"
        }, err => console.log(err));
    }
    deleteTemp() {
        const path = process.cwd() + "/temp";
        if (fs_1.existsSync(path)) {
            const files = fs_1.readdirSync(path);
            if (files.length > 0) {
                files.forEach(function (filename) {
                    if (fs_1.statSync(path + "/" + filename).isDirectory()) {
                        fs_1.rmdirSync(path + "/" + filename);
                    }
                    else {
                        fs_1.unlinkSync(path + "/" + filename);
                    }
                });
                fs_1.rmdirSync(path);
            }
            else {
                fs_1.rmdirSync(path);
            }
        }
    }
}
exports.IArchiveService = IArchiveService;
exports.ArchiveService = new IArchiveService();
