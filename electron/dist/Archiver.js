"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const archiver = require("archiver");
const extract = require("extract-zip");
let archive;
class IArchiveService {
    open(zipPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.extractZip(zipPath);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    cleanPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                try {
                    fs_1.access(path, () => fs_1.unlink(path, () => resolve()));
                }
                catch (err) {
                    console.log(err);
                }
                ;
            });
        });
    }
    startZip() {
        archive = archiver("zip", {
            store: true,
            readableObjectMode: true
        });
    }
    sendFilesToZip(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            arr.forEach((val) => __awaiter(this, void 0, void 0, function* () {
                archive = archive.file(val.path, { name: val.name });
            }));
        });
    }
    zipData(data) {
        archive = archive.append(data.text, { name: data.name });
    }
    finishZip(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const stream = fs_1.createWriteStream(path);
            archive.pipe(stream, { end: true });
            yield archive.finalize();
            yield new Promise(resolve => stream.end(() => resolve()));
        });
    }
    extractZip(zipPath) {
        try {
            fs_1.mkdirSync(process.cwd() + "/temp", { recursive: true });
        }
        catch (e) {
            "File already exists";
        }
        ;
        return new Promise(resolve => extract(zipPath, { dir: process.cwd() + "/temp" }, err => {
            if (err)
                console.log(err);
            resolve();
        }));
    }
}
exports.IArchiveService = IArchiveService;
exports.ArchiveService = new IArchiveService();
