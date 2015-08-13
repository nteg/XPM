function registerChannel() {

    if (!SampleNotifications.notifier) {
        SampleNotifications.notifier = new SampleNotifications.Notifier();
    }

    SampleNotifications.notifier.openChannelAndUploadAsync("http://localhost:63715/api/WindowsPushNotification").done(function (channel) {
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

