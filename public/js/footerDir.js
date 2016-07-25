angular.module('socialApp').directive('footerDir', function (){
    return {
        templateUrl: '../views/footer.html',
        restrict: 'E',
        scope: {
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            scope.$watch(function (theScope) {
                    return theScope.profileView;
                },
                function (profileViewChange, oldVal) {
                    if (profileViewChange) {
                        if(scope.profileView === 'friendslist'){
                            $('#friendslist').css({'border-bottom': '1px solid #00FFE9'});
                            $('#findfriends').css({'border-bottom': '1px solid transparent'});
                            $('#profile').css({'border-bottom': '1px solid transparent'});
                        }else if(scope.profileView === 'findfriends'){
                            $('#friendslist').css({'border-bottom': '1px solid transparent'});
                            $('#findfriends').css({'border-bottom': '1px solid #00FFE9'});
                            $('#profile').css({'border-bottom': '1px solid transparent'});
                        }else if(scope.profileView === 'profile'){
                            $('#friendslist').css({'border-bottom': '1px solid transparent'});
                            $('#findfriends').css({'border-bottom': '1px solid transparent'});
                            $('#profile').css({'border-bottom': '1px solid #00FFE9'});
                        }else{
                            $('#friendslist').css({'border-bottom': '1px solid transparent'});
                            $('#findfriends').css({'border-bottom': '1px solid transparent'});
                            $('#profile').css({'border-bottom': '1px solid transparent'});
                        }
                    }
                });
        }
    }
});