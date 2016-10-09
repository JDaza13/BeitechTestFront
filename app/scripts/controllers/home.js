(function () {
    //'use strict';
    var controller = app.controller('homeController', homeController);

    homeController.$inject = ['$scope','$rootScope', '$location','$routeParams'];
    function homeController($scope,$rootScope, $location,$routeParams) {
        console.log("you are now in the home")
    }
})();

