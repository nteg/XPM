(function () {
    angular.module('nagarroApp')
    .controller('SignInController', function ($scope, $state, $localStorage) {

        $scope.signIn = function (user) {

            $localStorage.user = user;
            $state.go('mainmenu.home');

        }
    });

})();