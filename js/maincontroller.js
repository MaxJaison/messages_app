/**
 * Created by HATHOR-MAX on 02.06.2016.
 */
(function() {
    'use strict';
    angular.module('MyApp')
        .controller('MainController', function mainController($firebaseArray, FBURL, $location, $filter) {
            var vm = this;
            var postsRef = new Firebase(FBURL);
            vm.date = $filter('date')(new Date(),'yyyy-MM-dd');

            /**Get current user*/
            var url = $location.path().split("/");
            vm.currentUser = url[2];

            /** Get all posts*/
            vm.posts = $firebaseArray(postsRef);
            console.log(vm.posts);

            /**Create new post*/
            vm.createPost = function() {
                vm.newPost = {
                    autor: vm.currentUser,
                    date: vm.date,
                    message: ""
                };
            };

            /**Add new post */
            vm.addPost = function() {
                vm.posts.$add(vm.newPost)
            };

            /**Filter current user posts*/
            vm.myPosts = [];
            vm.posts.forEach(function(post) {
                if(post.autor === vm.currentUser) {
                    vm.myPosts.push(post);
                }
            });
            console.log(vm.myPosts);

            /**User information*/
            vm.user = {
                age: 0,
                loc: "",
                site: ""
            };

            /**Edit user information*/
            vm.editInfo = function() {
                vm.showEditFields = true;
            };

            /**Save user information*/
            vm.saveInfo = function() {
                vm.showEditFields = false;
            };

            vm.init = function() {
                vm.currentUser = ""
            };

        });


})();
