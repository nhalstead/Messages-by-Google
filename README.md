### ~~Messages for Web~~
# Messages for Windows 10

[![GitHub license](https://img.shields.io/github/license/onlineth/Messages-by-Google)](https://github.com/onlineth/Messages-by-Google/blob/master/LICENSE) ![GitHub issues](https://img.shields.io/github/issues-raw/onlineth/Messages-by-Google)

A lightweight web container of Google's Messages for Web. Extremely Electron simple setup turned into a UWP Windows App.

<a href='//www.microsoft.com/store/apps/9PLC6BWV48DP?cid=storebadge&ocid=badge'><img src='https://i.imgur.com/jwfuBKE.png' alt='English badge' style='width: 284px; height: 104px;'/></a>


#### Features:

- __No Ads__
- Secure Isolated Web Container
- Message Notifications in Background
- Automatic Start Support*

*For app startup on login, go to Messages for Google App Settings -> App Startup options -> Enable.

#### Building from Source

This uses [Electron-Packager](https://github.com/electron/electron-packager) and [Electron Windows-Store](https://github.com/felixrieseberg/electron-windows-store) packages to build a valid UWP App.

```
git clone https://github.com/onlineth/Messages-by-Google
cd Messages-by-Google
```

Now package using Electron Packager

```
electron-packager . MessagesbyGoogle.App --overwrite --icon=assets/icon.ico --prune=true --out=release-builds --version-string.ProductName="Messages by Google"
```

And finally use Electron Windows Store to build the UWP App.
