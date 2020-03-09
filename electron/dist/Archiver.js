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
const rxjs_1 = require("rxjs");
let archive;
class IArchiveService {
    open(zipPath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("open");
            this.extractZip(zipPath);
        });
    }
    cleanPath(path) {
        try {
            fs_1.accessSync(path);
            fs_1.unlinkSync(path);
        }
        catch (_a) {
            return;
        }
    }
    startZip() {
        archive = archiver("zip", {
            store: true,
            readableObjectMode: true
        });
    }
    sendFilesToZip(arr) {
        arr.forEach((val) => __awaiter(this, void 0, void 0, function* () {
            yield archive.file(val.path, { name: val.name });
        }));
    }
    zipData(data) {
        archive.append(data.text, { name: data.name });
    }
    finishZip(path) {
        const stream = fs_1.createWriteStream(path);
        archive.pipe(stream);
        archive.on("finish", () => stream.end());
        return rxjs_1.from(archive.finalize());
    }
    extractZip(zipPath) {
        try {
            fs_1.mkdirSync(process.cwd() + "/temp", { recursive: true });
        }
        catch (e) {
            "File already exists";
        }
        ;
        try {
            extract(zipPath, {
                dir: process.cwd() + "/temp"
            }, err => {
                console.log(err);
                return;
            });
        }
        catch (_a) {
            console.log("Could not open files");
        }
    }
    deleteTemp() {
        const path = process.cwd() + "/temp";
        try {
            fs_1.accessSync(path, fs_1.constants.W_OK | fs_1.constants.R_OK);
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
                return;
            }
            else {
                fs_1.rmdirSync(path);
                return;
            }
        }
        catch (_a) {
            console.log("no access in deleteTemp");
            return;
        }
    }
}
exports.IArchiveService = IArchiveService;
exports.ArchiveService = new IArchiveService();
