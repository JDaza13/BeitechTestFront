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
        $scope.Detail = {
        	OrderId: "Select an order...",
        	items: [],
        	TotalEUR: 0,
        	TotalUSD: 0,
        }

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

    	$scope.getDetail = function(idOrder,trm){
	        //Obetener todos los detalles
	        $scope.Detail.OrderId = "Order No. " + idOrder;
	        Services.GetOrdersDetail()
	           .$promise
	               .then(function (response) {
	               		var detalles = response.filter(function(obj){
				    		return obj.orderId == idOrder;
				    	});
				    	$scope.Detail.items = detalles;
				    	var usd = 0;
				    	var eur = 0;
						$.each(detalles, function( i ) {
							eur += detalles[i].price;
						});
						usd=eur*trm;
						$scope.Detail.TotalUSD = usd;
						$scope.Detail.TotalEUR = eur;
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });

    	}

    }
})();
