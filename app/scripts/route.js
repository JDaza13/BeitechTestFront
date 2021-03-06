(function () {
    //"use strict";

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        });

        $routeProvider.when('/newOrder', {
            templateUrl: 'views/newOrder.html',
            controller: 'newOrderController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        }); 
        $routeProvider.when('/allOrders', {
            templateUrl: 'views/allOrders.html',
            controller: 'allOrdersController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        }); 

        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }]);

    app.run(['$rootScope', '$location', '$cookieStore', '$templateCache',
    function ($rootScope, $location, $cookieStore, $templateCache) {

    }]);
}());