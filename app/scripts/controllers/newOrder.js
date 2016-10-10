(function () {
    //'use strict';
    var controller = app.controller('newOrderController', newOrderController);

    newOrderController.$inject = ['Services','$scope','$rootScope', '$location','$routeParams'];
    function newOrderController(Services,$scope,$rootScope, $location,$routeParams) {
    	$scope.TRM = {};

    	$scope.Users = [];
    	$scope.Products = [];
    	$scope.UsersProducts = [];

    	$scope.userSel = {};
    	$scope.avalProducts = [];

    	$scope.orderDetail = [];
    	$scope.userSelFlag = true;

		$scope.Summary = {
			USD: null,
			EUR: null
		}

    	$scope.OrderAddress = "";
    	$scope.OrderDate = new Date();

    	$scope.init = function(){
	        //Obetener todos los Usuarios
	        Services.GetAllUsers()
	           .$promise
	               .then(function (response) {
	               		var users = response;
	               		$scope.Users = users;
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });
	        //Obetener todos los Productos
	        Services.GetAllProducts()
	           .$promise
	               .then(function (response) {
	               		var products = response;
	               		$scope.Products = products;
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });
	        //Obetener la relación usuario-producto
	        Services.GetAllUserProducts()
	           .$promise
	               .then(function (response) {
	               		var userProducts = response;
	               		$scope.UsersProducts = userProducts;
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });
	        /*Obtener las TRM, filtrar la TRM del dolar*/
			$.get( "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", function( data ) {
				var datos = data.getElementsByTagName("Cube");
				var TRMs = [];
				$.each(datos, function( i ) {
					var obj = {
						Currency : $(datos[i]).attr("currency"),
						Rate: $(datos[i]).attr("rate")
					}
					TRMs.push(obj);
				});

				TRMs = TRMs.filter(function(obj){
					return obj.Currency != undefined;
				});

				$scope.TRM = TRMs.filter(function(obj){
					return obj.Currency == "USD";
				})[0];

			});

    	}

    $scope.dataGridOrderOptions = {
    	bindingOptions:{
    		dataSource: 'orderDetail',
    		'columns[0].lookup.dataSource': 'avalProducts',
    		disabled : 'userSelFlag'
    	},
        editing: {
            mode: "batch",
            allowUpdating: true,
            allowAdding: true
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        columns: [{
	                dataField: "idProducto",
	                caption: "Producto",
	                lookup: {
	                    dataSource: $scope.avalProducts,
	                    displayExpr: "productName",
	                    valueExpr: "id"
	                }
            	},
				{
	                dataField: "price",
	                caption: "Precio",
	                dataType: 'number',
	                allowEditing: false
            	}
        ],
        summary: {
            totalItems: [{
                column: "Precio",
                name: "PrecioEUR",
                summaryType: "sum",
                cssClass: "displayNone"
            }]
        },
        onRowInserting: function(e){
        	e.data.orderId = null;
        	e.data.price = $scope.avalProducts.filter(function(obj){
        		return obj.id == e.data.idProducto;
        	})[0].price;
        	e.data.description = $scope.avalProducts.filter(function(obj){
        		return obj.id == e.data.idProducto;
        	})[0].productName;
        },
        onRowUpdating: function(e){
        	if(e.newData.idProducto){
	        	e.key.price = $scope.avalProducts.filter(function(obj){
	        		return obj.id == e.newData.idProducto;
	        	})[0].price;
	        	e.key.description = $scope.avalProducts.filter(function(obj){
	        		return obj.id == e.newData.idProducto;
	        	})[0].productName;
        	}
        },
       	onContentReady: function(e){
        	$scope.grid = $('#gridOrder').dxDataGrid('instance');
        	$scope.Summary.EUR = $scope.grid.getTotalSummaryValue("PrecioEUR");
        	$scope.Summary.USD = $scope.Summary.EUR * parseFloat($scope.TRM.Rate);
        }
    };



    $scope.GetProductsByUser = function(){
    	$scope.userSelFlag = false;

    	var products = [];
    	var id = $scope.userSel.id;
    	var productsArray = [];
    	var allProducts = $scope.Products;

    	products = $scope.UsersProducts.filter(function(obj){
    		return obj.idUser == id;
    	}).map(function(obj){
    		return obj.idProduct;
    	});
		$.each(products, function( i ) {
			$.each(allProducts, function( j ) {
				if(products [i] == allProducts[j].id){
					productsArray.push(allProducts[j]);
				}
			});
		});
		productsArray = _.uniq(productsArray, 'id');

		$scope.avalProducts = productsArray;

    }

    $scope.SaveOrder = function(){
    	var errors = [];

    	if($scope.orderDetail.length == 0){
    		errors.push("At least one product is required");
    	}
    	if(!$scope.userSel.id){
    		errors.push("You must select a client");
    	}
    	if($scope.OrderAddress == "" || $scope.OrderAddress == null || $scope.OrderAddress == undefined){
    		errors.push("A delivery address is required");
    	}
    	if($scope.OrderDate == null){
    		errors.push("You must select a date");
    	}
    	if(errors.length>0){
			$.each(errors, function( i ) {
				toastr.error(errors[i]);
			});
    	}
    	else{
    		var obj = {
    			customerId: $scope.userSel.id,
    			address: $scope.OrderAddress,
    			date: $scope.OrderDate.toISOString().split("T")[0],
    			trm: parseFloat($scope.TRM.Rate)
    		}

	        Services.SaveOrder(obj)
	           .$promise
	               .then(function (response) {
	               		var orderId = response.id;
	               		var details = $scope.orderDetail;

						$.each(details, function( i ) {
							details[i].orderId = orderId;
							delete details[i].__KEY__;
							delete details[i].idProducto;
						});
				        Services.SaveOrderDetail(details)
				           .$promise
				               .then(function (response) {
									console.log(response);
									toastr.success("Order registerd!");
									setTimeout(function(){ location.reload(); }, 500);				               		
				                })
				               .catch(function (response) {
				                    console.log(response); 
				                });             		
	                })
	               .catch(function (response) {
	                    console.log(response); 
	                });
    	}

    }
    }
})();
