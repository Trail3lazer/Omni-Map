import { IChild } from "./ichild";
import { from, Subject, BehaviorSubject, Observable } from "rxjs";
import { tap, map, switchMapTo } from "rxjs/operators";
import { dialogService } from "./DialogService";
import { ArchiveService, FileForZip, DataToZip } from "./Archiver";
import { readFileSync } from "fs";

export let projectFilePath$: BehaviorSubject<string> = new BehaviorSubject(null);
export let tree$: Subject<IChild> = new Subject;

function renameLeaf(leaf: IChild): string {
    return leaf.ancestry.join("_") + "." + leaf.path.split(".").pop();
}

class IProjectService {

    public save(data: IChild, name: string): void {
        if (projectFilePath$.value) {
            tree$.next(data);
            this.archiveData(name, projectFilePath$.value, data)
        } else {
            this.saveAs(name, data);
        };
    }

    public saveAs(name: string, data: IChild): void {
        tree$.next(data);
        dialogService.saveAs(name)
            .subscribe((path: string) => {
                console.log("save as emitted")
                if (path.length < 1) {
                    console.log("User canceled save");
                    return tree$.next(data);
                };
                projectFilePath$.next(path);
                this.archiveData(name, path, data);
            })
    }

    public open(): Observable<void> {
        return dialogService.selectProjectFile()
            .pipe(
                tap(path => {
                    if (path.length > 1) {
                        projectFilePath$.subscribe(path => ArchiveService.open(path))
                        projectFilePath$.next(path);
                    }
                }),
                map(path => {
                    if (path.length > 1) {
                        const projectTreePath = `${process.cwd()}\\temp\\project`;
                        tree$.next(JSON.parse(readFileSync(projectTreePath).toString()));
                    }
                })
            )
    }

    private archiveData(name: string, path: string, tree: IChild): Observable<void> {
        console.log("archiveData")
        ArchiveService.cleanPath(path)
        ArchiveService.startZip();
        const fileArray: FileForZip[] = this.createFileArrayFromTree(tree);
        ArchiveService.sendFilesToZip(fileArray);
        const projectData: DataToZip = {
            name: name,
            text: JSON.stringify(tree)
        };
        ArchiveService.zipData(projectData);
        return ArchiveService.finishZip(path).pipe(
            switchMapTo(from(ArchiveService.open(path)))
        )
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

