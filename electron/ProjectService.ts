import { IChild } from "./ichild";
import { from, Subject, BehaviorSubject, Observable, concat } from "rxjs";
import { tap, map } from "rxjs/operators";
import { dialogService } from "./DialogService";
import { ArchiveService, FileForZip, DataToZip } from "./Archiver";
import { readFileSync } from "fs";

export let projectFilePath$: BehaviorSubject<string> = new BehaviorSubject(null);
export let tree$: Subject<IChild> = new Subject;

function renameLeaf(leaf: IChild): string {
    return leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
}

class IProjectService {

    public async save(data: IChild, name: string): Promise<void> {
        if (projectFilePath$.value) {
            tree$.next(data);
            await this.archiveData(name, projectFilePath$.value, data);
            console.log("Archive done");
        } else {
            await this.saveAs(name, data);
        };
    }

    public async saveAs(name: string, data: IChild): Promise<void> {
        tree$.next(data);
        const path = await dialogService.saveAs(name)
        if (path.length < 1) {
            console.log("User canceled save");
            return tree$.next(data);
        };
        projectFilePath$.next(path);
        await this.archiveData(name, path, data);
        console.log("Archive done");
    }

    public async open(): Promise<void> {
        const path = await dialogService.selectProjectFile()
        if (path.length > 1) {
            projectFilePath$.subscribe(path => ArchiveService.open(path))
            projectFilePath$.next(path);
            const projectTreePath = `${process.cwd()}\\temp\\project`;
            tree$.next(JSON.parse(readFileSync(projectTreePath).toString()));
        }
    }

    private async archiveData(name: string, path: string, tree: IChild) {
        await ArchiveService.cleanPath(path)
        ArchiveService.startZip();
        const fileArray: FileForZip[] = this.createFileArrayFromTree(tree);
        await ArchiveService.sendFilesToZip(fileArray);
        const projectData: DataToZip = {
            name: name,
            text: JSON.stringify(tree)
        };
        ArchiveService.zipData(projectData);
        await ArchiveService.finishZip(path);
        await this.open
    }

    private organizeFileToZip(leaf: IChild): FileForZip {
        const newFileName = renameLeaf(leaf);
        const oldPath = leaf.path;
        leaf.path = process.cwd() + "\\temp\\" + newFileName;
        return {
            name: newFileName,
            path: oldPath
        }
    }

    private createFileArrayFromTree(tree: IChild): FileForZip[] {
        const fileArray: FileForZip[] = [];
        const files$ = new Subject<FileForZip>()
        let treeHolder = tree;
        files$.subscribe(
            next => {
                fileArray.push(next);
            });
        this.treeNodesDepthFirst(treeHolder, this.organizeFileToZip, files$);
        files$.complete();
        tree$.next(treeHolder);
        return fileArray
    }

    private treeNodesDepthFirst(leaf: IChild, fx: Function, returnValues$?: Subject<any>): void {
        returnValues$ ? returnValues$.next(fx(leaf)) : fx(leaf)
        if (leaf.children) {
            leaf.children.forEach(n => this.treeNodesDepthFirst(n, fx, returnValues$));
        };
    }
}

export const projectService: IProjectService = new IProjectService();

