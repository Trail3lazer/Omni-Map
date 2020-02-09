"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DialogService_1 = require("./DialogService");
const Archiver_1 = require("./Archiver");
let tree;
function renameLeaf(leaf) {
    return leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
}
class IProjectService {
    save(data, name) {
        tree = data;
        if (exports.projectFilePath) {
            this.archiveData(name);
            return rxjs_1.of(tree);
        }
        return DialogService_1.dialogService.saveAs(name)
            .pipe(operators_1.tap((path) => {
            if (path.length < 1) {
                console.log("User canceled save");
                return tree;
            }
            ;
            exports.projectFilePath = path;
            this.archiveData(name);
        }), operators_1.map(() => tree));
    }
    archiveData(name) {
        Archiver_1.ArchiveService.start(exports.projectFilePath);
        const fileArray = this.createFileArrayFromTree(tree);
        Archiver_1.ArchiveService.sendFilesToZip(fileArray);
        const projectData = {
            name: name,
            text: JSON.stringify(tree)
        };
        Archiver_1.ArchiveService.zipData(projectData);
        Archiver_1.ArchiveService.finish();
    }
    getFileName(path) {
        return path.split("\\").pop().split("/").pop();
    }
    ;
    organizeFileToZip(leaf) {
        const newFileName = renameLeaf(leaf);
        return {
            name: newFileName,
            path: leaf.path
        };
    }
    createFileArrayFromTree(tree) {
        const fileArray = [];
        const files$ = new rxjs_1.Subject();
        files$.subscribe(next => {
            fileArray.push(next);
        });
        this.treeNodesDepthFirst(tree, this.organizeFileToZip, files$);
        files$.complete();
        return fileArray;
    }
    saveProjectInfo(dir, tree) {
        const jsonProject = JSON.stringify({
            directory: dir,
            tree: tree
        });
        const filePath = dir + "project.json";
    }
    getFileExtention(str) {
        return str.split(".").pop();
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
