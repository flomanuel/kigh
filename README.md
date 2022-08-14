![kigh logo](doc/assets/kighMainImg.png)


[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
## Overview
Kigh lets you use your favourite web apps like desktop apps.

### Images
- [start page](doc/assets/demoImages/startPage.png).
- [new entry form page](doc/assets/demoImages/newEntry.png).

### Requirements
- npm and Node.js
- .NET Core 6
  - Packages: Photino.NET, Newtonsoft.Json, Microsoft.EntityFrameworkCore.Sqlite
- GNU/Linux-OS or Windows or macOS (only tested on Ubuntu 22.04.1 LTS)

### Building the application
From the project root folder:
- Run `npm i` to install the packages.
- Then build the frontend `npm run build` or `webpack --mode=production`
- Then run (or build) the .NET Core application: `dotnet run` (`dotnet build`)

## Terms of use
### kigh
The license for this project can be found [here](LICENSE).

### Third-party Libraries, Icon Sets, ...
This project builds upon open source libraries, icon sets, ...

Please see each projects' terms of use when using the provided code in
this repository.