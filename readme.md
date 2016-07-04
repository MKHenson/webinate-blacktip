# Webinate Blacktip
Webinate 'Blacktip' is a codename of the theme designed for the webinate 2015 site.
Blacktip is built in Angular and relies on [ModePress](https://github.com/MKHenson/modepress)
to provide some its backend content.

## Current stable version
* Version v0.1.1

## Requirements
<<<<<<< HEAD
* MongoDB v3.*
* Node ^6.2.0
=======
* MongoDB v3
* Node 6.2
>>>>>>> e9ec3eeaa64900a3462066ee2765533754025b43
* [Webinate-Users](https://github.com/MKHenson/webinate-users)
* [ModePress](https://github.com/MKHenson/modepress)
* **Tested Ubuntu v14.04**
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Installation

1) Make sure the requirements are installed and running
2) Create a folder where you want to store blacktip and go into that folder

```
mkdir blacktip
cd blacktip
```

3) Run as an admin / or make sure you have write privileges in the blacktip folder
```
sudo su
```

4) Download and install the desired version from github

If you want the latest stable version:

```
curl -o- https://raw.githubusercontent.com/MKHenson/webinate-blacktip/master/install-script.sh | bash
```

OR if you want the dev build

```
curl -o- https://raw.githubusercontent.com/MKHenson/webinate-blacktip/dev/install-script-dev.sh | bash
```

<<<<<<< HEAD
5) Install dependencies

```
    npm install
    gulp install
```

6) Add the "./dist" folder as a static folder to the modepress config.json - "staticFilesFolder"
=======
5) Install the build dependencies

    npm install

6) Build the project

```
gulp install
gulp build-all
```

Note: To build a release version, replace the build-all with build-all-release
>>>>>>> e9ec3eeaa64900a3462066ee2765533754025b43

```
<<<<<<< HEAD
E.g.
"staticFilesFolder": ["/blacktip/dist"]
=======
gulp install
gulp build-all-release
>>>>>>> e9ec3eeaa64900a3462066ee2765533754025b43
```
The release version is a lot smaller.

Once this is complete, the built project will reside in the dist folder

7) (Optional) Add the "dist" folder as a new target for Modepress

* Open the config file for modepress /modepress/config.json
* Create a new server block in the servers property
```
<<<<<<< HEAD
"templatePath": "/blacktip/dist/templates"
"index": "index"
=======
{
    "host": "webinate.net",
    "portHTTP": 8001,
    "ssl": false,
    "staticFilesFolder": ["YOUR DIST FOLDER PATH (MUST BE ABSOLUTE VALUE)"],
    "approvedDomains": ["webinate-test\\.net"],
    "controllers": [
        { "path" : "./controllers/page-renderer.js" },
        { "path" : "./controllers/emails-controller.js" },
        { "path" : "./controllers/posts-controller.js" },
        { "path" : "./controllers/comments-controller.js" }
    ],
    "paths": [
    {
        "name": "default",
        "path": "*",
        "index": "YOUR DIST FOLDER PATH (MUST BE ABSOLUTE VALUE)/index.jade",
        "plugins": []
    }]
}
>>>>>>> e9ec3eeaa64900a3462066ee2765533754025b43
```


## Third Party Credits
Blacktip makes use of the following third party libraries

* [JQuery](https://jquery.com/)
* [AngularJS](https://angularjs.org/)
* [Angular UI Router](https://github.com/angular-ui/ui-router)
* [JSSOR Slider](http://www.jssor.com/)
* [Google Maps](https://developers.google.com/maps/)
