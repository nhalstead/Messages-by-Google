const {app, BrowserWindow} = require('electron');
let mainWindow;

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    mainWindow.show();
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('ready', () => {
    app.setAppUserModelId("7185ThomasHein.MessagesbyGoogle");
    createWindow()
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: false,
      nodeIntegration: false
    },
    icon: "assets/icon.png"
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL('https://messages.google.com/web/');

  mainWindow.on('close', function(event) {
    event.preventDefault();
    mainWindow.hide();
  })
}

app.on('activate', function() {
	if (mainWindow === null) createWindow()
});
