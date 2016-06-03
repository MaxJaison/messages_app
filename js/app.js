(function () {
    'use strict';
    angular.module('MyApp', ['ui.router', 'firebase'])
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('/', {
                    url: '/login',
                    templateUrl: 'templates/login.html'
                })
                .state('users', {
                    url: '/user/:user',
                    templateUrl: 'templates/userprofile.html'
                })
                .state('all', {
                    url: '/all',
                    templateUrl: 'templates/allmessages.html'
                });
        })
        .constant("FBURL", "https://mymessagesapp.firebaseio.com/");
})();