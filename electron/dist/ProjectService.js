"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let directory = "C:/Users/jwight1/Desktop";
class IProjectService {
    save(data) {
        const tree = data;
        this.treeNodesDepthFirst(tree, this.copyToDir);
        return tree;
    }
    getFileExtention(str) {
        return str.split(".").pop();
    }
    copyToDir(leaf) {
        const newFileName = leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
        const newPath = directory + "/" + newFileName;
        const newLeaf = Object.assign(Object.assign({}, leaf), { path: newPath });
        fs_1.copyFile(leaf.path, newPath, () => { });
        return newLeaf;
    }
    treeNodesDepthFirst(leaf, fx) {
        leaf = fx(leaf);
        if (leaf.children) {
            leaf.children.forEach(n => n = this.treeNodesDepthFirst(n, fx));
        }
        ;
    }
    getFileName(str) {
        return str.split("\\").pop().split("/").pop();
    }
    ;
}
exports.projectService = new IProjectService();
