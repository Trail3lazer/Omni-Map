import { IChild } from "./ichild";
import { Subject } from "rxjs";
import { dialogService } from "./DialogService";
import { ArchiveService, FileForZip, DataToZip } from "./Archiver";
import { readFileSync } from "fs";
import * as _ from "lodash";

export let projectFilePath$: Subject<string> = new Subject();
export let tree$: Subject<IChild> = new Subject;
let projectFilePath: string;

class IProjectService {

    constructor() {
        projectFilePath$.subscribe(path => {
            projectFilePath = path;
            ArchiveService.open(path);
        })
    }

    public async save(data: IChild, name: string): Promise<void> {
        if (projectFilePath) {
            tree$.next(data);
            await this.archiveData(name, projectFilePath, data);
        } else {
            await this.saveAs(name, data);
        };
    }

    public async saveAs(name: string, data: IChild): Promise<void> {
        const path = await dialogService.saveAs(name)
        if (path.length < 1) {
            console.log("User canceled save");
        };
        await this.archiveData(name, path, data);
    }

    public async open(): Promise<void> {
        const path = await dialogService.selectProjectFile()
        if (path) {
            projectFilePath$.next(path);
            const projectTreePath = `${process.cwd()}\\temp\\project`;
            const newProjectTree = JSON.parse(readFileSync(projectTreePath).toString());
            tree$.next(newProjectTree);
            console.log(path);
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
        await this.open()
    }
    
    private prepareFileForStorage(leaf: IChild): void {
        const newFileName = leaf.ancestry.join("_") + "." + this.getFileExtension(leaf.path);
        leaf.path = process.cwd() + "\\temp\\" + newFileName; 
    }

    private getFileExtension(path: string): string{
        return path.split(".").pop();
    }

    private organizeFileToZip(leaf: IChild): FileForZip {
        const oldPath = leaf.path.toString();
        this.prepareFileForStorage(leaf);
        return {
            name: leaf.path,
            path: oldPath
        }
    }

    private createFileArrayFromTree(tree: IChild): FileForZip[] {
        const fileArray: FileForZip[] = [];
        const files$ = new Subject<FileForZip>();
        const mutableTree = _.cloneDeep(tree);
        files$.subscribe(
            next => {
                fileArray.push(next);
            });
        this.treeNodesDepthFirst(mutableTree, this.organizeFileToZip, files$);
        tree$.next(mutableTree)
        files$.complete();
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

