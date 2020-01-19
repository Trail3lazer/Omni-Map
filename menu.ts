const { Menu } = require("electron");

module.exports = function menuBuilder(app: Electron.App) {

  const isMac = process.platform === "darwin";

  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: [
        {
          label: "Save",
          click: () => {}
        },
        {
          label: "Save As",
          click: () => {}
        },
        {
          label: "New Project",
          click: () => {}
        }
     ]}
  ];
  return Menu.buildFromTemplate(template);
};
