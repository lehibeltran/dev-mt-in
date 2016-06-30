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
                    scope.profileView = 'findfriends';
                    scope.currentUser = response;
                    console.log("there is a profile");
                    scope.loadFriends();
                } else {
                    $location.path("/");
                }
            });
            scope.loadFriends = function () {
                MainService.loadUsers().then(function (response) {
                        console.log(response.status);
                        if (response.status === 200) {
                            var friendsAvailable = response.data.filter(function(object){
                                return scope.currentUser.friends.indexOf(object.id) <= -1; //true if higher than -1
                            });
                            scope.friends = friendsAvailable;
                            console.log("Done loading friends!");
                        } else {
                            alert("Error " + response.status + " load unsuccessful");
                        }
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
