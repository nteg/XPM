// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var pushNotifications = Windows.Networking.PushNotifications;
    var channel;

  
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
                document.getElementById("registerChannel").addEventListener("click", registerChannel, false);

                if (!SampleNotifications.notifier) {
                    SampleNotifications.notifier = new SampleNotifications.Notifier();
                }

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function registerChannel() {
        SampleNotifications.notifier.openChannelAndUploadAsync("http://localhost:52870/Home/Index").done(function (channel) {
            SampleNotifications.currentChannel = channel;
            if (channel) {
                channel.onpushnotificationreceived = onPushNotification;
            }
        }, function (error) {
            if (error.message) {
                WinJS.log && WinJS.log(error.message, "sample", "error");
            }
            else if (error.statusText) {
                WinJS.log && WinJS.log(error.statusText, "sample", "error");
            }
            else {
                WinJS.log && WinJS.log("An undefined error occurred.", "sample", "error");
            }
        }, function (progress) {
            WinJS.log && WinJS.log(progress, "sample", "status");
        });
    }

    var content;
    function onPushNotification(e) {
        var notificationTypeName = "";
        var notificationPayload;
        switch (e.notificationType) {
            // You can get the toast, tile, or badge notification object.
            // In this example, we take the XML from that notification and display it.
            case pushNotifications.PushNotificationType.toast:
                notificationTypeName = "Toast";
                notificationPayload = e.toastNotification.content.getXml();
                break;
            case pushNotifications.PushNotificationType.tile:
                notificationTypeName = "Tile";
                notificationPayload = e.tileNotification.content.getXml();
                break;
            case pushNotifications.PushNotificationType.badge:
                notificationTypeName = "Badge";
                notificationPayload = e.badgeNotification.content.getXml();
                break;
            case pushNotifications.PushNotificationType.raw:
                notificationTypeName = "Raw";
                notificationPayload = e.rawNotification.content;
                break;
        }

        // Setting the cancel property prevents the notification from being delivered. It's especially important to do this for toasts:
        // if your application is already on the screen, there's no need to display a toast from push notifications.
        //e.cancel = true;
        WinJS.log && WinJS.log(notificationTypeName + " notification was received and canceled. Notification payload: " + notificationPayload, "sample", "status");
    }

    app.start();
})();