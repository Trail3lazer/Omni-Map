"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const archiver = require("archiver");
let archive;
class IArchiveService {
    open(path) {
        archive;
    }
    start(path) {
        this.restartArchive();
        const newZip = fs_1.createWriteStream(path);
        this.pipeStream(newZip);
    }
    sendFilesToZip(arr) {
        arr.forEach(val => archive.file(val.path, { name: val.name }));
    }
    zipData(data) {
        archive.append(data.text, { name: data.name });
    }
    finish() {
        archive.finalize();
    }
    pipeStream(stream) {
        archive.pipe(stream);
    }
    restartArchive() {
        archive = archiver('zip', {
            zlib: { level: 0 }
        });
    }
}
exports.IArchiveService = IArchiveService;
exports.ArchiveService = new IArchiveService();
