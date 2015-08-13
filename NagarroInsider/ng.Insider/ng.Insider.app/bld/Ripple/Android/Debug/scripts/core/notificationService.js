app.service('NotificationService', function ($q, $http) {
    return {
        setNotifications: function () {
            $http.get("http://localhost:63715/api/notification")
        .success(function (response) {
            window.localStorage['notifications'] = angular.toJson(response)
        });
        },
        getNotifications: function () {
            
            this.setNotifications();

            var temp = angular.fromJson(window.localStorage['notifications']);
            if (temp) {
                return temp
            }
        },
        refresh: function(){
            var notificationArray = this.getNotifications();
        },
        getDetails: function (id) {
            var dfd = $q.defer()
            var notificationArray = this.getNotifications();
            for (var i = 0; i < notificationArray.length; i++) {
                if (notificationArray[i].id == id) {
                    dfd.resolve(notificationArray[i]);
                }
            }
            return dfd.promise;
        }

    }
})