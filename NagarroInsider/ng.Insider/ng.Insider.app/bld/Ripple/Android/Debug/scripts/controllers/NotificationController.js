
app.controller('NotificationController', function ($scope,notifications , $http) {

    $scope.pagetitle = "Notifications";

    //$http.get("http://localhost:63715/api/notification")
    //.success(function (response) {
    //    $scope.menuItems = response; // localStorage.getItem("announcements");;
    //});

    $scope.notifications = notifications

    $scope.refresh = function () {
    }


})