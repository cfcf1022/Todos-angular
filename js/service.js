(function (angular) {
	'use strict';

    // Your starting point. Enjoy the ride!
    angular.module('serviceApp',[])
    .service('taskService',['$window',function($window){

        var that = this;

        //获取本地存储中的数据
        var todoList = JSON.parse($window.localStorage.getItem('todoList'))||[];
        // var todoList = [
        //     {id:'1',isCompleted:false,name:'吃早饭'},
        //     {id:'2',isCompleted:false,name:'吃午饭'},
        //     {id:'3',isCompleted:true,name:'吃晚饭'},
        // ]
        this.todoList = todoList;

        //保存任务数据到本地存储
        this.saveInfo = function(){
            $window.localStorage.setItem('todoList',JSON.stringify(todoList));
        }

        //添加任务数据
        var id;
        this.add = function(info){
            if(todoList.length===0){
                id = 1 ;
            }else{
                 id = todoList[todoList.length-1].id+1;
            }
            todoList.push({id:id,isCompleted:false,name:info});
            // console.log(todoList);
            // that.saveInfo();
        }

        //删除任务数据
        this.del = function(id){
            todoList.forEach(function(v,i){
                if(v.id === id){
                    todoList.splice(i,1);
                }
            })
            // that.saveInfo();
        }

        //全选数据
        this.isCompletedAll = function(checkAll){
            todoList.forEach(function(v,i){
                v.isCompleted = checkAll;
            })
            // console.log(todoList);
            // that.saveInfo();
        }

        //单选按钮控制全选按扭
        this.controlAll =function(){
        //    for(var i = 0;i<todoList.length;i++){
        //        if(!todoList[i].isCompleted){
        //            return false;
        //        }
        //    }
        //     return true;
            return todoList.every(function(v){
                        return v.isCompleted
                    })
        }

         //获取未完成的数据
         this.getCount = function(){
             var count = 0;
             todoList.forEach(function(v){
                if(!v.isCompleted){
                    count++;
                }
             })
            // console.log(count);
            return count;
         }

         //显示隐藏清空已完成的按钮
         this.isShow = function(){
            return todoList.some(function(v){
                    return v.isCompleted;
                })
         }


         //点击清空已完成的任务
         this.clearCompleted = function(){
             var temArr = [];
             todoList.forEach(function(v){
                if(!v.isCompleted){
                    temArr.push(v);
                }
             })
             
             //先清空数组
             todoList.length = 0;
             //再把未完成的添加到数组
             [].push.apply(todoList,temArr);
         }



    }])



})(angular);
