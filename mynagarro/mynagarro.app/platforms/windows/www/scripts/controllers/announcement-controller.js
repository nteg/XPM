(function () {
    angular.module('nagarroApp')
        .controller('AnnouncementController', function ($scope, $http, AnnounceService) {

            $scope.items = AnnounceService.announcements;

            $scope.doRefresh = function () {

                AnnounceService.setAnnouncements().then(function () {
                    AnnounceService.getAnnouncements().then(function (result) {
                        $scope.items = result;
                    }).finally(function () {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                })
            };
        });

})();