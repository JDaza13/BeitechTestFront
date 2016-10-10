(function () {
    "use strict";
    var services = angular.module('common.services').factory("appSettings", ['ngResource', 'ngRoute', '$http']);

    services.factory("Services", function ($resource, appSettings) {
        return $resource(null, {}, {
            GetAllUsers: { method: 'GET', isArray: true,url: appSettings.serverPath + "/getAllUsers"},
            GetAllProducts: { method: 'GET', isArray: true,url: appSettings.serverPath + "/getAllProducts"},
            GetAllUserProducts: { method: 'GET', isArray: true,url: appSettings.serverPath + "/getAllUserProducts"},

            GetOrdersBetween: { method: 'GET', isArray: true,url: appSettings.serverPath + "/getOrdersBetween/:from/:to"},

            SaveOrder: { method: 'POST', url: appSettings.serverPath + "/addOrder"},
            SaveOrderDetail: { method: 'POST', url: appSettings.serverPath + "/addMultipleDetails"}          
        });
    });    
    
}());
