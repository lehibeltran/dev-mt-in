angular.module('socialApp').controller('MainCtrl', function($scope, MainService) {

    $scope.CurrentUser = JSON.parse(sessionStorage.getItem('CurrentUser'));

    $scope.$watch(function(scope) { return scope.CurrentUser },
        function(newValue, oldValue) {
            if(newValue){
                $scope.$broadcast('currentUser', $scope.CurrentUser);
                $scope.logValue = 'Log Off';
                $scope.User = true;
                $scope.welcomeMessage = false;
                $scope.formNewUser = false;
                $scope.HamButton = false;
                $scope.canvasMini = true;
            }else{
                $scope.$broadcast('currentUser', $scope.CurrentUser);
                $scope.logValue = 'Log in';
                $scope.User = false;
                $scope.welcomeMessage = true;
                $scope.formNewUser = true;
                $scope.HamButton = true;
                $scope.canvasMini = false;
            }
        }
    );

  $scope.saveUser = function() {
      MainService.saveUser(newUser()).then( function (response){
          console.log(response.status);
          if (response.status === 201){
              $scope.CurrentUser = [newUser()];
              $scope.welcomeMessage = false;
              $scope.formNewUser = false;
              $scope.User = true;
              clearSaveForm();
              clearLogin();
              console.log($scope.CurrentUser);
              console.log("done adding user!");
          }
      });
      
  };

  $scope.logOff = function(logValue){
      if(logValue === 'Log Off'){
          MainService.removeCurrentUser($scope.CurrentUser[0].id);
          $scope.CurrentUser = undefined;
          sessionStorage.removeItem('CurrentUser');
          // sessionStorage.removeItem('img2src');
          $scope.myModal = '';
          $scope.modal = '';
      }else{
          $scope.myModal ='#myModal';
          $scope.modal ='modal';
      }
  };

  $scope.loginUser = function() {
      MainService.checkUserLogin(loginObj()).then(function(response){
          if(response.data && response.data.length > 0) {
              MainService.setCurrentUser(response.data[0].id);
              $scope.CurrentUser = response.data;
              console.log($scope.CurrentUser);
              sessionStorage.setItem('CurrentUser', JSON.stringify($scope.CurrentUser));
              $scope.welcomeMessage = false;
              $scope.formNewUser = false;
              $scope.User = true;
              clearSaveForm();
              clearLogin();
          }else{
              alert("User not found");
          }
      }).catch(function(err) { //if there is an error
          return console.log(err);
      });
  };

  $scope.getFriends = function() {
    MainService.getFriends($scope.name).then(function(response){
      $scope.friends = response;
    });
  };

  function loginObj() {
    return {
        username: $scope.username,
        password: $scope.password
    }
  }

  function newUser() {
    return {
      name: $scope.name,
      tagline: $scope.tagline,
      profilePic: $scope.profilePic,
      bio: $scope.bio,
      id: Math.random() * 5000,
      friends: []
    }
  }

  function clearLogin () {
      $scope.username = '';
      $scope.password = '';
    }

  function clearSaveForm () {
    $scope.name = '';
    $scope.tagline = '';
    $scope.profilePic = '';
    $scope.bio = '';
  }

});
