const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 320,
        height: 634,
        // resizable: false,
        autoHideMenuBar: true,
        frame: false,
        transparent: true,
        minHeight: 634,
        minWidth: 320
    });
    win.loadFile('./index.html');
}
app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
})

