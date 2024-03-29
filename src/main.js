const {app, BrowserWindow, Menu, Tray, nativeImage} = require('electron');
let mainWindow, tray;


/*
 * Only allow once instance to be open at a time
 */
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
    showApp();
});


/*
 * App launch window creation
 */
app.on('ready', () => {
    app.setAppUserModelId('7185ThomasHein.MessagesByGoogle');
    createWindow();
    createTaskTray();
});


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: false,
            nodeIntegration: false
        },
        icon: 'src/assets/icon.png',
        show: false
    });

    mainWindow.setMenu(null);
    mainWindow.setTitle('Messages for Google');
    mainWindow.loadURL('https://messages.google.com/web/');

    mainWindow.on('close', function (event) {
        if (process.platform === 'win32') {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.show();
    });
}


/*
 * Tray specific functions
 */
function createTaskTray() {
    try {
        const trayIcon = nativeImage.createFromPath('src/assets/icon.ico');
        tray = new Tray(trayIcon);

        tray.setToolTip('Messages by Google');
        tray.on('click', showApp);
        tray.on('double-click', showApp);

        const contextMenu = Menu.buildFromTemplate([
            {label: 'Reload App', click: reloadApp},
            {type: 'separator'},
            {label: 'Show', click: showApp},
            {label: 'Exit', click: exitApp}
        ]);
        tray.setContextMenu(contextMenu);
    } catch (e) {
        // Failed to create Tray Icon
        console.log('Failed to Create Icon', e);
    }
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

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});
