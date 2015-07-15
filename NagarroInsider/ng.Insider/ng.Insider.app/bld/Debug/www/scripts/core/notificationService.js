app.service('NotificationService', function ($q, $http) {
    return {
        setNotifications: function () {

            var deferred = $q.defer();

            $http.get("http://localhost:63715/api/notification")
                    .success(function (response) {
                        window.localStorage['notifications'] = angular.toJson(response)
                    }).then(function () {
                        var temp = angular.fromJson(window.localStorage['notifications']);
                        deferred.resolve(temp);
                    });
            return deferred.promise;
        },
        //getNotifications: function () {

        //    this.setNotifications();

        //    var temp = angular.fromJson(window.localStorage['notifications']);
        //    if (temp) {
        //        return temp
        //    }
        //},

        getNotificationsAsync: function () {
            var dfd = $q.defer()
            var temp = angular.fromJson(window.localStorage['notifications']);
            dfd.resolve(temp);


            //this.setNotifications().then(function () {
            //    var temp = angular.fromJson(window.localStorage['notifications']);
            //    dfd.resolve(temp);
            //}, function () {
            //    console.log("Error has occured");
            //});

            return dfd.promise;


        },

        refresh: function () {
            var notificationArray = this.getNotificationsAsync();
        },
        getDetails: function (id) {
            var dfd = $q.defer()
            //var notificationArray =
            this.getNotificationsAsync().then(function (notificationArray) {
                for (var i = 0; i < notificationArray.length; i++) {
                    if (notificationArray[i].id == id) {
                        dfd.resolve(notificationArray[i]);
                    }
                }
            });
            
            return dfd.promise;
        }

    }
})