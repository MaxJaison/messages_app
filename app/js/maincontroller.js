(function() {
    'use strict';
    angular.module('MyApp')
        .controller('MainController', function mainController($firebaseArray, $firebaseObject, FBURL, $state, $location) {
            var vm = this;
            var user = $location.path().split("/").slice(2);
            vm.currentUser = user.toString().toLowerCase();

            var postsRef = new Firebase(FBURL + '/mesages');
            var userRef = new Firebase(FBURL + '/users');
            vm.date = new Date();

            /** Get all posts*/
            vm.posts = $firebaseArray(postsRef);

            vm.user = $firebaseObject(userRef.child(vm.currentUser));

            /**Create new post*/
            vm.createPost = function() {
                vm.newPost = {
                    author: vm.currentUser,
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

            /**Edit user information*/
            vm.editInfo = function() {
                vm.showEditFields = true;
            };

            /**Save user information*/
            vm.saveInfo = function() {
                vm.user.$save();
                vm.showEditFields = false;
            };

            /**Clear current user*/
            vm.clearUser = function() {
                vm.currentUser = "";
            };

        });
})();
