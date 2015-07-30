(function () {
    angular.module('nagarroApp')
    .controller('SignInController', function ($scope, $state) {
        $scope.signIn = function (user) {
            $state.go('mainmenu.home');
        }
    });

})();