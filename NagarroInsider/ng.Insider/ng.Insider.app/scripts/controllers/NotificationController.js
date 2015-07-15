
app.controller('NotificationController', function ($scope, NotificationService, notifications) {

    $scope.pagetitle = "Notifications";

    //$http.get("http://localhost:63715/api/notification")
    //.success(function (response) {
    //    $scope.menuItems = response; // localStorage.getItem("announcements");;
    //});

    $scope.refresh = function (scope) {
        NotificationService.setNotifications().then(function () {
            NotificationService.getNotificationsAsync().then(function (data) {
                $scope.notifications = data;
            });
        });

    };


    $scope.notifications = notifications

})