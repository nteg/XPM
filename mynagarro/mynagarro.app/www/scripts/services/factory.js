(function () {

    'use strict';

    angular.module('nagarroApp')
    .factory('AnnounceService', function ($q, $http, $localStorage) {

        var obj = {};

        obj.announcements = $localStorage.announcements;

        obj.setAnnouncements = function () {
            var deferred = $q.defer();

            var localData = $localStorage.announcements;

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

                  $localStorage.announcements = localData;
              })

            return deferred.promise;

        }

        obj.getAnnouncements = function () {
            var deferred = $q.defer();

            var data = $localStorage.announcements;

            deferred.resolve(data);

            return deferred.promise;

        }

        obj.getDetails = function (id) {

            var data = $localStorage.announcements;
            var card = {};
            data.forEach(function (ele, idx, arra) {
                if (ele.id == id) {
                    card = ele;
                    data[idx].cssClass = 'read';
                }

            });

            $localStorage.announcements = data;
            obj.announcements = $localStorage.announcements;
            return card;
        }


        return obj;
    });

})();