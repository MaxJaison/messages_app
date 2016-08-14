(function () {
    'use strict';
    angular.module('MyApp', ['ui.router', 'firebase'])
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('main', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController'
                })
                .state('users', {
                    url: '/user/:user',
                    templateUrl: 'templates/userprofile.html',
                    controller: 'MainController'
                })
                .state('all', {
                    url: '/all',
                    templateUrl: 'templates/allmessages.html'
                });
        })
        .constant("FBURL", "https://mymessagesapp.firebaseio.com")
})();