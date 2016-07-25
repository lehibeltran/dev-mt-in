angular.module('socialApp').directive('profileUpdateDir', function ($location, MainService) {
    return {
        templateUrl: '../views/profileUpdateForm.html',
        restrict: 'E',
        scope: {
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            MainService.getCurrentUser().then(function (response) {
                if (response) {
                    scope.currentUser = response;
                    scope.profileView = 'profile';
                } else {
                    $location.path("/");
                }
            });
            scope.updateUser = function () {
                if (userValues()) {
                    var userObj = updateU();
                    MainService.updateUser(userObj).then(function (response) {
                        if (response.status === 201) {
                            console.log("Done updating user!");
                        } else {
                            alert("Error " + response.status + " Update unsuccessful");
                        }
                        clearSaveForm();
                    }).catch(function (err) { //if there is an error
                        return console.log(err);
                    });
                } else {
                    alert("all values are required");
                }
            };
            function updateU() {
                return {
                    name: scope.name,
                    tagline: scope.tagline,
                    profilePic: scope.profilePic,
                    bio: scope.bio,
                    id: scope.currentUser.id,
                    friends: []
                }
            }
            function userValues() {
                if (!scope.name || !scope.tagline || !scope.profilePic || !scope.bio) {
                    return false;
                } else {
                    return true;
                }
            }
            function clearSaveForm() {
                scope.name = '';
                scope.tagline = '';
                scope.profilePic = '';
                scope.bio = '';
                scope.myFormUpdate.$setPristine();
            }
        }
    }
});
