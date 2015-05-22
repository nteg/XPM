angular.module('interview.directives', [])

.directive('topNav', function() {
  return {
    replace: true,
    templateUrl: 'templates/topNav.html',
  };
});