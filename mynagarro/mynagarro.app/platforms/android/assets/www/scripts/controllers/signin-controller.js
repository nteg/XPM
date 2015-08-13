(function () {
    angular.module('nagarroApp')
    .controller('SignInController', function ($scope, $state, $localStorage) {


        $scope.$storage = $localStorage;

        $scope.signIn = function (user) {

            $storage.user = user;

            console.log($localStorage.user);

            $state.go('mainmenu.home');

        }
    });

})();