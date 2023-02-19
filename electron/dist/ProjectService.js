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
const rxjs_1 = require("rxjs");
const DialogService_1 = require("./DialogService");
const Archiver_1 = require("./Archiver");
const fs_1 = require("fs");
const _ = require("lodash");
exports.projectFilePath$ = new rxjs_1.Subject();
exports.tree$ = new rxjs_1.Subject;
let projectFilePath;
class IProjectService {
    constructor() {
        exports.projectFilePath$.subscribe(path => {
            projectFilePath = path;
            Archiver_1.ArchiveService.open(path);
        });
    }
    save(data, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (projectFilePath) {
                exports.tree$.next(data);
                yield this.archiveData(name, projectFilePath, data);
            }
            else {
                yield this.saveAs(name, data);
            }
            ;
        });
    }
    saveAs(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield DialogService_1.dialogService.saveAs(name);
            if (path.length < 1) {
                console.log("User canceled save");
            }
            ;
            yield this.archiveData(name, path, data);
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield DialogService_1.dialogService.selectProjectFile();
            if (path) {
                exports.projectFilePath$.next(path);
                const projectTreePath = `${process.cwd()}\\temp\\project`;
                const newProjectTree = JSON.parse(fs_1.readFileSync(projectTreePath).toString());
                exports.tree$.next(newProjectTree);
                console.log(path);
            }
        });
    }
    archiveData(name, path, tree) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Archiver_1.ArchiveService.cleanPath(path);
            Archiver_1.ArchiveService.startZip();
            const fileArray = this.createFileArrayFromTree(tree);
            yield Archiver_1.ArchiveService.sendFilesToZip(fileArray);
            const projectData = {
                name: name,
                text: JSON.stringify(tree)
            };
            Archiver_1.ArchiveService.zipData(projectData);
            yield Archiver_1.ArchiveService.finishZip(path);
            yield this.open();
        });
    }
    prepareFileForStorage(leaf) {
        const newFileName = leaf.ancestry.join("_") + "." + this.getFileExtension(leaf.path);
        leaf.path = process.cwd() + "\\temp\\" + newFileName;
    }
    getFileExtension(path) {
        return path.split(".").pop();
    }
    organizeFileToZip(leaf) {
        const oldPath = leaf.path.toString();
        this.prepareFileForStorage(leaf);
        return {
            name: leaf.path,
            path: oldPath
        };
    }
    createFileArrayFromTree(tree) {
        const fileArray = [];
        const files$ = new rxjs_1.Subject();
        const mutableTree = _.cloneDeep(tree);
        files$.subscribe(next => {
            fileArray.push(next);
        });
        this.treeNodesDepthFirst(mutableTree, this.organizeFileToZip, files$);
        exports.tree$.next(mutableTree);
        files$.complete();
        return fileArray;
    }
    treeNodesDepthFirst(leaf, fx, returnValues$) {
        returnValues$ ? returnValues$.next(fx(leaf)) : fx(leaf);
        if (leaf.children) {
            leaf.children.forEach(n => this.treeNodesDepthFirst(n, fx, returnValues$));
        }
        ;
    }
}
exports.projectService = new IProjectService();
