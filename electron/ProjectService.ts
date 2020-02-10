import { IChild } from "./ichild";
import { Subject, of, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { dialogService } from "./DialogService";
import { ArchiveService, FileForZip, DataToZip } from "./Archiver";
import { WriteStream } from "fs";

export let projectFilePath: string;
let tree: IChild;

function renameLeaf(leaf: IChild): string {
    return leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
}

class IProjectService {
        
    public save(data: IChild, name:string): Observable<IChild> {
        tree = data
        if (projectFilePath) {
            this.archiveData(name);
            return of(tree);
        }
        return dialogService.saveAs(name)
        .pipe(
            tap((path: string) => {
                if (path.length < 1) {console.log("User canceled save"); return tree;};
                projectFilePath = path;
                this.archiveData(name);
            }),
            map(() => tree)
        );
    }

    public open(){
        dialogService.selectProjectFile()
        .subscribe(
            path => {
                if (path.length < 1) return;
                ArchiveService.open(path);
                projectFilePath = path;
            }
        )
    }

    private archiveData(name: string): void {
        ArchiveService.startZip(projectFilePath);
        const fileArray: FileForZip[] = this.createFileArrayFromTree(tree);
        ArchiveService.sendFilesToZip(fileArray);
        const projectData: DataToZip = {
            name: name,
            text: JSON.stringify(tree)
        };
        ArchiveService.zipData(projectData);
        ArchiveService.finishZip();
        ArchiveService.open(projectFilePath);
    }

    private organizeFileToZip(leaf: IChild): FileForZip {
        const newFileName = renameLeaf(leaf);
        return {
            name: newFileName,
            path: leaf.path
        }
    }

    private createFileArrayFromTree(tree: IChild): FileForZip[] {
        const fileArray: FileForZip[] = [];
        const files$ = new Subject<FileForZip>()
        files$.subscribe(
            next => {
                fileArray.push(next);
            });
        this.treeNodesDepthFirst(tree, this.organizeFileToZip, files$);
        files$.complete()
        return fileArray
    }

    private saveProjectInfo(dir: string, tree: IChild): void{
        const jsonProject = JSON.stringify({
            directory: dir,
            tree: tree
        });
        const filePath = dir+"project.json";
    }
    
    private treeNodesDepthFirst(leaf: IChild, fx: Function, returnValues$?: Subject<any>): void {
        returnValues$? returnValues$.next(fx(leaf)) : fx(leaf)
        if(leaf.children) {
          leaf.children.forEach(n => this.treeNodesDepthFirst(n, fx, returnValues$));
        };
    }
}

export const projectService: IProjectService = new IProjectService();

