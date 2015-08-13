(function () {

    'use strict';

    angular.module('nagarroApp')
    .factory('AnnounceService', function ($q, $http) {

        var obj = {};

        obj.announcements = angular.fromJson(window.localStorage['announcementData']);

        obj.setAnnouncements = function () {
            var deferred = $q.defer();

            var localData = angular.fromJson(window.localStorage['announcementData']);

            if (localData != undefined) {
                var target = Math.max.apply(Math, localData.map(function (o) { return o.id; }))
            }
            else {
                localData = [];
            }

            $http.get('http://localhost:21525/api/values/' + target)
              .success(function (data) {
                  deferred.resolve(data);
                  data.forEach(function (ele, idx, arra) {
                      data[idx].cssClass = 'unread';
                      localData.push(data[idx]);
                  });

                  window.localStorage['announcementData'] = angular.toJson(localData);
              })

            return deferred.promise;

        }

        obj.getAnnouncements = function () {
            var deferred = $q.defer();

            var data = angular.fromJson(window.localStorage['announcementData']);

            deferred.resolve(data);

            return deferred.promise;

        }

        obj.getDetails = function (id) {

            var data = angular.fromJson(window.localStorage['announcementData']);
            var card = {};
            data.forEach(function (ele, idx, arra) {
                if (ele.id == id) {
                    card = ele;
                    data[idx].cssClass = 'read';
                }

            });

            window.localStorage['announcementData'] = angular.toJson(data);
            obj.announcements = angular.fromJson(window.localStorage['announcementData']);
            return card;
        }


        return obj;
    });

})();