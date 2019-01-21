import { app, BrowserWindow } from 'electron'
import * as url from 'url';
import * as path from 'path';
import * as flashTrust from 'nw-flash-trust-a'
import { createReadStream } from 'fs';
import * as express from "express";
import { appendFile } from 'fs';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9082`
  : `http://localhost:8888/index.html`

  
let flashPath = app.getPath('pepperFlashSystemPlugin');
console.log(flashPath);

app.commandLine.appendSwitch("ppapi-flash-path", flashPath);
// app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.013');
app.commandLine.appendSwitch('disable-web-security');

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: true,
    webPreferences: {
      plugins: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV === "production") {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {})
      .catch(err => {
        console.log('Unable to install `vue-devtools`: \n', err)
      })
    localServer();
  }
}

function localServer() {
  let server = express();
  server.use(express.static(__dirname));
  server.listen(8888);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
