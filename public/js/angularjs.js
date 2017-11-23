var app = angular.module('app', [])
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    })
    .controller('paginationCtrl', function($scope, $http,$sce) {
        $scope.currentPage = 0;
        $scope.itemsPerPage = 1005;
        $scope.openProyecto = openProyecto;
        $scope.items = [];
        /*for(var i=0; i<25; i++){
          $scope.items.push('Product ' + i);
        } */
        $http.get("http://localhost:8080/projectsm")
            .then(function(response) {

                if (response.data != null) {
                    if (response.data.success == null) {
                        $scope.items = response.data;
                        debugger;
                        $scope.html = $scope.items[0].desarrollo;
                        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
                        //$scope.thisCanBeusedInsideNgBindHtml = response.data;
                        
                    }

                }

            });
        $scope.firstPage = function() {
            return $scope.currentPage == 0;
        }
        $scope.lastPage = function() {
            var lastPageNum = Math.ceil($scope.items.length / $scope.itemsPerPage - 1);
            return $scope.currentPage == lastPageNum;
        }
        $scope.numberOfPages = function() {
            return Math.ceil($scope.items.length / $scope.itemsPerPage);
        }
        $scope.startingItem = function() {
            return $scope.currentPage * $scope.itemsPerPage;
        }
        $scope.pageBack = function() {
            $scope.currentPage = $scope.currentPage - 1;
        }
        $scope.pageForward = function() {
            $scope.currentPage = $scope.currentPage + 1;
        }
    });