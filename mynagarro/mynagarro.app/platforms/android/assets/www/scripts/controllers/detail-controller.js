(function () {
    angular.module('nagarroApp')
        .controller('DetailController', function ($scope, $state, $stateParams, AnnounceService) {

            $scope.navigate = function () {
                $state.go('mainmenu.announcements')
            };

            $scope.item = AnnounceService.getDetails($stateParams.id);

        })
})();