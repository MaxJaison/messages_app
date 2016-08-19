(function() {
    'use strict';
    angular.module('MyApp')
        .controller('MainController', function mainController($firebaseArray, $firebaseObject, FBURL, $state, $location) {
            var vm = this;

            var user = $location.path().split("/").slice(2);
            vm.currentUser = user.toString().toLowerCase();

            /**Get Data From Firbase*/
            var postsRef = new Firebase(FBURL + '/mesages');
            var userRef = new Firebase(FBURL + '/users');
            vm.posts = $firebaseArray(postsRef);
            vm.user = $firebaseObject(userRef.child(vm.currentUser));

            /**Create new post*/
            vm.date = new Date();
            vm.createPost = function() {
                vm.newPost = {
                    author: vm.currentUser,
                    date: vm.date.getTime(),
                    message: ""
                };
            };

          /**Sort User Post */
           vm.sortPosts = function() {
             function filterPosts(post) {
               return post.author === vm.currentUser;
             }
             vm.posts.$loaded().then(function(data) {
               vm.userPosts =  data.filter(filterPosts);
             });
           };

            /**Add new post */
            vm.addPost = function() {
              vm.posts.$add(vm.newPost);
              vm.sortPosts();
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

            vm.init = function () {
              vm.sortPosts();
            }
        });
})();
