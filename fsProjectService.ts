const fs = require("fs");
const { dialog, ipcMain } = require("electron");

const getFileName = (str) => {
    return str.split("\\").pop().split("/").pop();
};

module.exports = function listener(app: Electron.App) {

    let directory = `${app.getPath("documents")}/untitled-map/`;

    ipcMain.on("select working dir", event => {
        dialog.showOpenDialog(
            {
                title: "Select project folder",
                buttonLabel: "Select",
                properties: ["openDirectory"],
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                directory = `${actual.filePaths[0]}`;
                event.reply("select working dir", actual.filePaths[0]);
            } else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err));
    });

    ipcMain.on("import file", event => {
        dialog.showOpenDialog(
            {
                title: "Select file to import to project",
                buttonLabel: "Attach",
                properties: ["openFile"],
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                event.reply("import file", {
                    fileName: getFileName(actual.filePaths[0]),
                    path: actual.filePaths[0]
                })
            } else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err));
    });

    ipcMain.on("save file", () => {
        dialog.showOpenDialog(
            {
                title: "Select file to import to project",
                buttonLabel: "Attach",
                properties: ["openFile"],
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                const fileName = getFileName(actual.filePaths[0]);
                fs.copyFile(actual.filePaths[0], `${directory}/${fileName}`, err => console.log(err));
            } else {
                console.log("no paths returned");
            }
        }).catch(err => console.log(err));
    });

    ipcMain.on("new project", event => {
        dialog.showOpenDialog({
            properties: ["createDirectory", "promptToCreate"],
            title: "New project",
            buttonLabel: "Create",
            defaultPath: app.getPath("documents")+"\\omni-map\\"
        }).then(actual => {
            if (actual.filePaths.length > 0) {
                directory = actual.filePaths[0];
                event.reply("new project", actual.filePaths[0]);
            } else {
                fs.mkdir(`${app.getPath("documents")}\\omni-map\\`);
                directory = `${app.getPath("documents")}\\omni-map\\`;
            }
        }).catch(err => console.log(err));
    })

}
