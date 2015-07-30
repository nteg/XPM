(function () {
    angular.module('nagarroApp')
        .controller('AnnouncementController', function ($scope, $http) {
            $scope.items = [];
            $scope.doRefresh = function () {

                console.log('I have been called');

                $http.get('http://localhost:21525/api/values')
                .success(function (newItems) {
                    $scope.items = newItems;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
        });

})();