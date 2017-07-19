(function (angular) {
	'use strict';

    // Your starting point. Enjoy the ride!
    
    angular.module('controllerApp',[])
    // .config(['$routeProvider',function($routeProvider){
    //     $routeProvider
    //     .when('/active',{

    //     })
    //     .when('/completed',{

    //     })
    //     .when('/',{

    //     })

    // }])
    .controller('taskController',['$scope','$location','taskService',function($scope,$location,taskService){
        

        var vm = $scope;
        var Ser = taskService;
        // console.log(vm);
        // console.log($scope);

        //获取数据添加到页面
        vm.todoList= Ser.todoList;

        vm.addData = "";
        //添加任务数据
        vm.add = function(){
           if(vm.addData.trim()==0){
               return;
           }

           Ser.add(vm.addData);

           vm.addData = "";

        }

        //删除任务数据
        vm.del = Ser.del;

       
        //页面根据刷新获取全选按钮当前值
        vm.checkAll = Ser.controlAll();
        //单选按钮控制全选按扭
         // 如果要监视对象数据的变化，需要传入第三个参数：true
        vm.$watch('todoList',function(newValue,oldValue){
            // console.log(newValue);
            // console.log(oldValue);
            if(newValue===oldValue){
                return;
            }
            vm.checkAll = Ser.controlAll();

            Ser.saveInfo();
        },true)

          //全选按钮
        vm.isCompletedAll =function(){
            Ser.isCompletedAll(vm.checkAll);
        }


        //双击编辑
        vm.editingId = -1;
        vm.edit = function(id){
            vm.editingId = id;
        }
        vm.saveEdit = function(){
            vm.editingId = -1;
        }

        //获取未完成的数据
        vm.getCount = Ser.getCount;


        //显示隐藏清空已完成的按钮
        vm.isShow = Ser.isShow;

        //点击清空已完成的任务
        vm.clearCompleted = Ser.clearCompleted;


        //更具监视location的url判断
        vm.status = undefined;
        vm.location = $location;
        vm.$watch('location.url()',function(newValue,oldValue){
            // console.log(newValue);
            switch(newValue){
                case "/active":
                vm.status = false;
                break;
                case "/completed":
                vm.status = true;
                break;
                default:
                vm.status = undefined;
                break;
            }
        })










    }])

})(angular);
