import { app, BrowserWindow } from 'electron'
import * as url from 'url';
import * as path from 'path';
import * as flashTrust from 'nw-flash-trust'

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
  : `file://${__dirname}/index.html`

  
let flashPath = app.getPath('pepperFlashSystemPlugin');
console.log(flashPath);

app.commandLine.appendSwitch("ppapi-flash-path", flashPath);
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.013');
app.commandLine.appendSwitch('disable-web-security');

let trustManager = flashTrust.initSync("test-electron-rtmp");
trustManager.add("rtmp://live.hkstv.hk.lxdns.com/live/hks2")

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
      plugins: true,
      webSecurity: false
    },
  })

  let swfUrl = url.format({
    pathname: path.join(__dirname, 'bookmark.swf'),
    protocol: "file:",
    slashes: true
  });

  mainWindow.loadURL(winURL)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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
