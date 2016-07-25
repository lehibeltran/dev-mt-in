angular.module('socialApp').directive('searchFriendsDir', function ($location, $state, MainService) {
    return {
        templateUrl: '../views/searchFriendsFlex.html',
        restrict: 'E',
        scope: {
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            MainService.getCurrentUser().then(function (response) {
                if (response) {
                    scope.currentUser = response;
                    scope.profileView = 'findfriends';
                    scope.loadFriends();
                } else {
                    $location.path("/");
                }
            });
            scope.loadFriends = function () {
                MainService.loadUsers().then(function (response) {
                        var friendsList = response.data.filter(function(userObject){
                            return scope.currentUser.id !== userObject.id;
                        });
                        var friendsAvailable = friendsList.filter(function(object){
                            return scope.currentUser.friends.indexOf(object.id) <= -1; //true if higher than -1
                        });
                        scope.friends = friendsAvailable;
                }).catch(function (err) { //if there is an error
                    return console.log(err);
                });
            };
            scope.loadFriend = function (friendObj){
                $state.go('profilefriend', {friend: friendObj, visibleF: true});
            }
        }
    }
});
