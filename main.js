const { app, BrowserWindow,Menu, Tray } = require('electron');
let mainWindow, tray;

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
	  showApp()
  });

  app.on('ready', () => {
    app.setAppUserModelId("7185ThomasHein.MessagesByGoogle");
    createWindow();
	  createTaskTray();
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
  mainWindow.setTitle("Messages for Google");
  mainWindow.loadURL('https://messages.google.com/web/');

  mainWindow.on('close', function(event) {
    event.preventDefault();
    mainWindow.hide();
  })
}

function createTaskTray() {
	tray = new Tray('assets/icon.ico');

	tray.setToolTip('Messages by Google');
	tray.on("click", showApp);
	tray.on("double-click", showApp);

	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Reload App', click: reloadApp },
		{ type: "separator" },
		{ label: 'Show', click: showApp },
		{ label: 'Exit', click: exitApp }
	]);
	tray.setContextMenu(contextMenu);
}

function reloadApp() {
	mainWindow.webContents.reload();
}

function showApp() {
	mainWindow.show();
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
}

function exitApp() {
	mainWindow.close();
	app.exit();
}

app.on('activate', function() {
	if (mainWindow === null) createWindow()
});
