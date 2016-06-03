/**
 * Created by HATHOR-MAX on 02.06.2016.
 */
(function() {
    'use strict';
    angular.module('MyApp')
        .controller('MainController', function mainController($firebaseArray, FBURL) {
            var vm = this;
            var postsRef = new Firebase(FBURL);
            vm.date = new Date();

            /** Get all posts*/
            vm.posts = $firebaseArray(postsRef);

            /**Create new post*/
            vm.createPost = function() {
                vm.newPost = {
                    autor: vm.currentUser,
                    date: vm.date.getTime(),
                    message: ""
                };
            };

            /**Add new post */
            vm.addPost = function() {
                vm.posts.$add(vm.newPost);
                vm.filterUserPosts();
            };

            /**Current user posts*/
            vm.filterUserPosts = function() {
                vm.myPosts = [];
                postsRef.once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childData = childSnapshot.val();
                        if (childData.autor === vm.currentUser) {
                            vm.myPosts.push(childData);
                        }
                    });
                });
            };


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

            /**Clear current user*/
            vm.clearUser = function() {
                vm.currentUser = "";
            };

        });


})();
