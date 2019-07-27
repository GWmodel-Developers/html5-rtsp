import { app, BrowserWindow } from 'electron'
import * as url from 'url';
import * as path from 'path';
import * as express from "express";
import * as expressWebSocket from "express-ws";
import * as ffmpeg from "fluent-ffmpeg";
const webSocketStream = require("websocket-stream/stream");

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
// app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.013');
app.commandLine.appendSwitch('disable-web-security');

let server;

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
  }
}

app.on("ready", localServer);

function localServer() {
  server = express();
  server.use(express.static(__dirname));
  expressWebSocket(server, undefined, {
    perMessageDeflate: true
  });
  server.ws("/rtsp/:id/", rtspRequestHandle);
  server.listen(8888);
}

function rtspRequestHandle(ws, req) {
  let url = req.query.url;
  console.log("rtsp url:", url);
  console.log("rtsp params:", req.params);
  const stream = webSocketStream(ws, {
      binary: true
  });
  url = `G:\\影视\\长安十二时辰\\The.Longest.Day.In.Chang'an.2019.Complete.1080p.WEB-DL.H264.AAC-TJUPT\\The.Longest.Day.In.Chang'an.2019.E0${parseInt(req.params.id).toFixed(0)}.1080p.WEB-DL.H264.AAC-TJUPT.mp4`
  console.log("rtsp url:", url);
  let ffmpegCommand = ffmpeg(url)
    .addInputOption("-analyzeduration", "100000", "-max_delay", "1000000")
    .on("start", function () {
        console.log(url, "Stream started.");
    })
    .on("codecData", function () {
        console.log(url, "Stream codecData.")
    })
    .on("error", function (err) {
        console.log(url, "An error occured: ", err.message);
        stream.end();
    })
    .on("end", function () {
        console.log(url, "Stream end!");
        stream.end();
    })
    .outputFormat("flv").videoCodec("copy").noAudio()
  stream.on("close", function () {
    ffmpegCommand.kill('SIGKILL');
  });
  try {
      ffmpegCommand.pipe(stream);
  } catch (error) {
      console.log(error);
  }
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
