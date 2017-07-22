// original:
// https://www.airpair.com/angularjs/posts/angularjs-from-prototyping-to-functional-code


// file: scripts/app.js 
var app = angular.module('clientsApp', []);

//
app.directive('mdlCheckbox', function ($timeout) {
  return {
    restrict: 'E',
    /*scope: {
        ngModel: '='
    },*/
    replace: true,
    transclude: true,
    template: '\
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">\
          <input type="checkbox" class="mdl-checkbox__input">\
        <span class="mdl-checkbox__label">{{label}}</span></label>',
    link: function($scope, el, $attrs){
      $scope.label = $attrs.label;
    },
    compile: function(){
        return {
          post: function postLink(scope, element){
            $timeout(function(){
              componentHandler.upgradeElements(element[0]);
            }, 0);
          }
        };
      },
  }
});

// file: scripts/controllers/clientsCtrl.js
app.controller('ClientsCtrl', function($scope, Clients) {

  $scope.clients = [ 
        { id: 1, name: 'John', age: 25, percentage: 0.3 }, 
        { id: 2, name: 'Jane', age: 39, percentage: 0.18 }, 
        { id: 3, name: 'Jude', age: 51, percentage: 0.54 }, 
        { id: 4, name: 'James', age: 18, percentage: 0.32 },
        { id: 5, name: 'John', age: 22, percentage: 0.91 } 
    ]; 
  
 /* Clients.all().success(function(data) {
     $scope.clients = data;
  });*/
  
  $scope.delete = function(client) { 
    var index = $scope.clients.indexOf(client); 
    $scope.clients.splice(index, 1); 
   /* return Clients.delete(client.id).success(function(data) { 
        var index = $scope.clients.indexOf(client); 
        $scope.clients.splice(index, 1); 
    });*/
  };
  
  $scope.create = function() { 
    $scope.newClient.id = $scope.clients.length + 1; 
    $scope.clients.push($scope.newClient); 
    $scope.newClient = null; 
    /*Clients.create($scope.newClient).success(function(data) { 
        $scope.clients.push(data); 
        $scope.newClient = null; 
    }); */
  };
  
  $scope.edit = function(client) {
    $scope.activeClient = client;
   /* return Clients.delete(client.id).success(function(data) { 
        var index = $scope.clients.indexOf(client); 
        $scope.clients.splice(index, 1); 
    }); */
  }; 
  $scope.update = function(client) { 
    $scope.activeClient = null;
     /*Clients.update(client).success(function(data) { 
        $scope.activeClient = null; 
    });*/
  };

});


// scripts/factories/clients.js 
app.factory('Clients', function($http) { 
    var BASE_URL = '/clients'; 
    return { 
        all: function() { 
            return $http.get(BASE_URL); 
        }, 
        create: function(client) { 
            return $http.post(BASE_URL, client); 
        }, 
        update: function(client) { 
            return $http.put(BASE_URL + '/' + client.id, client); 
        }, 
        delete: function(id) { 
            return $http.delete(BASE_URL + '/' + id); 
        } 
    }; 
});


// scripts/filters/percentage.js 
app.filter('percentage', function() { 
    return function(value) { 
        return value * 100 + ' %'; 
    }; 
});



// scripts/directives/integer.js
app.directive('integer', function() { 
    var INTEGER_REGEXP = /^\-?\d+$/; 
    return { 
        require: 'ngModel', 
        link: function(scope, elm, attrs, ctrl) { 
          ctrl.$validators.integer = function(modelValue, viewValue) { 
            if (ctrl.$isEmpty(modelValue)) return true; 
            if (INTEGER_REGEXP.test(viewValue)) return true; 
            return false; 
          }; 
        } 
    }; 
});

