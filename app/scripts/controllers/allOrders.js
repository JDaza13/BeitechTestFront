(function () {
    //'use strict';
    var controller = app.controller('allOrdersController', allOrdersController);

    allOrdersController.$inject = ['Services','$scope','$rootScope', '$location','$routeParams'];
    function allOrdersController(Services,$scope,$rootScope, $location,$routeParams) {

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.FechaDesde = firstDay;
        $scope.FechaHasta = lastDay;

        $scope.Orders = [];

    	$scope.init = function(){
    		var from = $scope.FechaDesde.toISOString().split("T")[0];
    		var to = $scope.FechaHasta.toISOString().split("T")[0];

    		$scope.getOrdersBetween(from,to);
    	}

    	$scope.getOrdersBetween = function(from,to){
	        //Obetener todos los Usuarios
	        Services.GetOrdersBetween({from: from, to: to})
	           .$promise
	               .then(function (response) {
	               		$scope.Orders = response;
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });
    	}

    }
})();
