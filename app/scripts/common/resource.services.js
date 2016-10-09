(function () {
    "use strict";
    var services = angular.module('common.services').factory("appSettings", ['ngResource', 'ngRoute', '$http']);

    services.factory("Products", function ($resource, appSettings) {
        return $resource(null, {}, {
            GetAllProducts: { method: 'GET', url: appSettings.serverPath + "/getAllProducts"},
        });
    });
    
}());
