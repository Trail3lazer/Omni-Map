import { IChild } from "./ichild";
import { copyFile } from "fs"

let directory: string = "C:/Users/jwight1/Desktop";

class IProjectService {

    public save(data: IChild) {
        const tree = data;
        this.treeNodesDepthFirst(tree, this.copyToDir)
        return tree
    }

    private getFileExtention(str: string) {
        return str.split(".").pop();
    }

    private copyToDir(leaf: IChild) {
        const newFileName = leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
        const newPath = directory + "/" + newFileName;
        const newLeaf: IChild = {
            ...leaf,
            path: newPath
        };
        copyFile(leaf.path, newPath, () => {});
        return newLeaf;
    }

    private treeNodesDepthFirst(leaf: IChild, fx) {
        leaf = fx(leaf);
        if(leaf.children) {
          leaf.children.forEach(n => n = this.treeNodesDepthFirst(n, fx));
        };
    }

    private getFileName(str: string) {
        return str.split("\\").pop().split("/").pop();
    };
}

export const projectService: IProjectService = new IProjectService();

