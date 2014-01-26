// Generated by CoffeeScript 1.6.3
(function() {
  var HomeController, libr;

  libr = angular.module('libr.controllers.home', []);

  HomeController = (function() {
    HomeController.$inject = ['$scope', '$location', 'BookService', 'ScanService'];

    function HomeController($scope, $location, BookService, ScanService) {
      var _this = this;
      this.$scope = $scope;
      this.$location = $location;
      BookService.getBooks().success(function(result) {
        _this.$scope.books = result.books;
        _this.$scope.enableBackButton = false;
        return _this.$scope.rightButtons = [
          {
            type: 'button-icon icon ion-camera',
            tap: function(e) {
              return ScanService.scan();
            }
          }
        ];
      });
    }

    return HomeController;

  })();

  libr.controller('HomeCtrl', HomeController);

}).call(this);
