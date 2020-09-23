// Basic nodejs imports like filesystem and path
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
// Node JS modules from external source
const AdmZip = require("adm-zip");
const rimraf = require("rimraf");
// Electron and Electron modules import



const electron = require("electron");
const DownloadManager = require("electron-download-manager");
const { app, BrowserWindow, ipcMain, Menu, globalShortcut, shell } = electron;
const settings = require("electron-settings");


// Creates the main menu window
function createMainWindow() {  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 200,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      allowEval: false,
    },
  })

  // Add custom menu bar to the app
  var menu = Menu.buildFromTemplate([

    {
      label: "Test App",
      submenu: [
        {
          label: "Refresh",
          accelerator: "CmdOrCtrl+R",
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          },
        },
        {
          label: "Dev Console",
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          },
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },    {
      role: "window",
      submenu: [
        {
          role: "zoomin",
        },
        {
          role: "zoomout",
        },
        {
          role: "resetzoom",
        },
        {
          role: "togglefullscreen",
        },
      ],
    },
  ]);
  // Set the custom menu in the title bar
  Menu.setApplicationMenu(menu);
  // Load the html file into the window
  mainWindow.loadFile("index.html");
  // Reacts to the closed button (top right corner) by closing the program
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Reacts to the ready state message from the app
app.on("ready", () => createMainWindow());

// Quit when all windows are closed for Mac users
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
