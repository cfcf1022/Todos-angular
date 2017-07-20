(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	angular.module('myApp',['ngRoute','controllerApp','serviceApp'])
	.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/:status?',{
            templateUrl:'./view/todo.html',
            controller:'taskController'
        })
       

    }])


})(angular);
