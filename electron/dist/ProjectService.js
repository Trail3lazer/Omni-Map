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
const operators_1 = require("rxjs/operators");
const DialogService_1 = require("./DialogService");
const Archiver_1 = require("./Archiver");
const fs_1 = require("fs");
exports.projectFilePath$ = new rxjs_1.BehaviorSubject(null);
exports.tree$ = new rxjs_1.Subject;
function renameLeaf(leaf) {
    return leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
}
class IProjectService {
    save(data, name) {
        if (exports.projectFilePath$.value) {
            exports.tree$.next(data);
            this.archiveData(name, exports.projectFilePath$.value, data);
        }
        else {
            this.saveAs(name, data);
        }
        ;
    }
    saveAs(name, data) {
        exports.tree$.next(data);
        DialogService_1.dialogService.saveAs(name)
            .subscribe((path) => {
            console.log("save as emitted");
            if (path.length < 1) {
                console.log("User canceled save");
                return exports.tree$.next(data);
            }
            ;
            exports.projectFilePath$.next(path);
            this.archiveData(name, path, data);
        });
    }
    open() {
        return DialogService_1.dialogService.selectProjectFile()
            .pipe(operators_1.tap(path => {
            if (path.length > 1) {
                exports.projectFilePath$.subscribe(path => Archiver_1.ArchiveService.open(path));
                exports.projectFilePath$.next(path);
            }
        }), operators_1.map(path => {
            if (path.length > 1) {
                const projectTreePath = `${process.cwd()}\\temp\\project`;
                exports.tree$.next(JSON.parse(fs_1.readFileSync(projectTreePath).toString()));
            }
        }));
    }
    archiveData(name, path, tree) {
        console.log("archiveData");
        return rxjs_1.from(() => __awaiter(this, void 0, void 0, function* () {
            yield Archiver_1.ArchiveService.cleanPath(path);
            Archiver_1.ArchiveService.startZip(path);
            const fileArray = this.createFileArrayFromTree(tree);
            Archiver_1.ArchiveService.sendFilesToZip(fileArray);
            const projectData = {
                name: name,
                text: JSON.stringify(tree)
            };
            Archiver_1.ArchiveService.zipData(projectData);
            Archiver_1.ArchiveService.finishZip();
            Archiver_1.ArchiveService.open(path);
        }));
    }
    organizeFileToZip(leaf) {
        const newFileName = renameLeaf(leaf);
        const oldPath = leaf.path;
        leaf.path = process.cwd() + "\\temp\\" + newFileName;
        return {
            name: newFileName,
            path: oldPath
        };
    }
    createFileArrayFromTree(tree) {
        const fileArray = [];
        const files$ = new rxjs_1.Subject();
        let treeHolder = tree;
        files$.subscribe(next => {
            fileArray.push(next);
        });
        this.treeNodesDepthFirst(treeHolder, this.organizeFileToZip, files$);
        files$.complete();
        exports.tree$.next(treeHolder);
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
