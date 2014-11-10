rock-paper-scissors
===================

Rock Paper Scissors game as a Web App

## Commands
To install the app launch: `npm install`.
Note: it could give some errors on Windows due to the 255 character filename limit during the installation of `grunt-contrib-imagemin`.
To avoid it, just launch `npm install grunt-contrib-imagemin` after `npm install`.

To build the app launch: `grunt build`.
It compiles LESS files, executes jslint and csslint tasks, then concatenate and minifies files (including images).

To run unit tests launch: `grunt test`.

To run a server with the development version launch:  `grunt dev`  (server address: http://localhost:8000)

To run a server with the distribution version (after it has been built) launch: `grunt dist` (server address: http://localhost:8000)
If you don't need the server, you can just open the dist/index.html file.


## Online version
You can try the game here: http://www.gabrielenosso.com/rps/
Android mobile version: https://play.google.com/store/apps/details?id=com.gabrielenosso.rockpaperscissors

## Details
To develop the game I used the module design pattern to split the application logic in more JavaScript files, using the namespace "app" to avoid global scope pollution.

The application is highly maintainable and expandable: you can add more values to use in the "game" module just expanding the "gameMap" variable.
Of course you should also add new buttons in the index.html file and the relative images with the name of new values (as rock-btn.png and rock.png).

The application is completely responsive and works perfectly on mobile devices (on Android 2 devices too).
It works also on IE8 and IE9 (without any polyfill), but the animation is just emulated with single frames (IE8 tested with modern.ie Virtual Machine).