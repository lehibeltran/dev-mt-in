angular.module('socialApp').service('MainService', function($http, $q){

    this.checkUserLogin = function(User){
        return $http.get('http://localhost:3000/users?name='+User.username+'&id='+User.password);
    };

    // this.getCurrentUser = function(){
    //     // var deferrer = $q.defer();
    //     // var firstCheck;
    //     // var secondCheck;
    //     return $http.get('http://localhost:3000/currentUser')
    //         .then(function(response){
    //             console.log(response.data);
    //             //if (Object.keys(response.data[length-1]).length > 2){
    //                 return {};
    //             // .catch(function(err) { //if there is an error do something console.log err
    //             //     return console.error(err);
    //             // });
    //             // }else{
    //             //     return $http.get('http://localhost:3000/users?id='+response.data[length-1].id)
    //             //         .then(function(response){
    //             //             return response.data;
    //             //         })
    //             // }
    //         });
    // };

    this.setCurrentUser = function(idValue){
        console.log("setCurrentUser() id: "+idValue);
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/currentUser/',
            data: {id: idValue}
        }).then(function(response){
            console.log(response.status);
        }).catch(function(err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.removeCurrentUser = function(id){
        console.log("removeCurrentUser() idLogOff: "+id);
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/currentUser/',
            data: {idLogOff: id}
        }).then(function(response){
            console.log(response.status);
        }).catch(function(err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.saveUser = function(newUser){
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/users',
            data: newUser
        }).catch(function(err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.getFriends = function(currentUser){
        return $http.get('http://localhost:3000/users?name='+currentUser)
            .then(function(response){
                if(response.status === 200){
                    console.log(response.data);
                }
                return response.data;
            });
    }
 });
