(function () {
    'use strict';

    angular.module('routes').config(routerConfig);
    routerConfig.$inject = ['$routeProvider', '$locationProvider'];


    function routerConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/auth', {
                templateUrl: 'layouts/auth.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'layouts/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when('/error', {
                templateUrl: 'layouts/error.html',
                controller: 'errorCtrl'
            })
            .otherwise({redirectTo: '/dashboard'});

        //$locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode(true);

    }

})();