# Splash Screen Ionic
This application is based on Ionic Framework which uses ngCordova for handling SplashScreen functions.
We have used cordova plugin for splashscreen which Ionic provide us at the time of creating the scaffolding of the application.

Before Using the application do the following steps

npm install
bower install
ionic platform add android
ionic emulate android

SplashScreen can be generated using resource directory
> cd resources
add icon.png and splash.png
run -> ionic resources

ionic resources command will automatically generate the icons and splashscreens in the android directory.

config.xml contains splashscreen delay preference which can be changed( in this app its 10 sec)
 

Stay tuned for awesome stuff!