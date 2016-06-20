angular.module('socialApp', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html",
                controller: 'myCanvasCtrl'
            })
            .state('profile', {
                url:"/profile",
                templateUrl: "views/profileView.html"
            })
            .state('friendslist', {
                url:"/friendslist/:findIdx",
                templateUrl: "views/friendsList.html",
                controller: 'friendsController'
            })
            .state('findfriends', {
                url:"/friends",
                templateUrl: "views/friends.html"
            });

        $urlRouterProvider.otherwise("/");
    });
