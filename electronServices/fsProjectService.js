const fs = require("fs");
const { dialog, ipcMain, app } = require("electron");
let directory = `file://${app.getPath("documents")}/untitled-map/`;


const getFileName = (str) => {
    return str.split('\\').pop().split('/').pop();
};

module.exports = function listener() {
    ipcMain.on("select working dir", event => {
        dialog.showOpenDialog(
            {
                title: "Select project folder",
                buttonLabel: "Select",
                properties: ["openDirectory"],
            }
        ).then(actual => {
            if (actual.filePaths.length > 0) {
                directory = `file://${actual.filePaths[0]}/untitled-map/`;
                event.reply("select working dir", actual.filePaths[0])
            } else {
                console.log("no paths returned")
            }
        }).catch(err => console.log(err))
    });

    ipcMain.on("import file", () => {
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
                console.log("no paths returned")
            }
        }).catch(err => console.log(err))
    });

    ipcMain.on("new project", () => {
        dialog.showOpenDialog({
            properties: ["createDirectory", "promptToCreate"],
            title: "New project",
            buttonLabel: "Create",
            defaultPath: app.getPath("documents")+"/untitled-map/"
        }).then(actual => {
            if (actual.filePaths.length > 0) {
                directory = actual.filePaths[0];
                event.reply("new project", actual.filePaths[0])
            } else {
                console.log("new project")
            }
        }).catch(err => console.log(err))
    })
}
