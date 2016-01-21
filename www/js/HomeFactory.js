(function () {
  'use strict';

  function HomeFactory( $rootScope, APP_SETTINGS, $firebaseArray ) {

    var groupId = $rootScope.user.id;
    console.log(groupId);

    var tasksRef = new Firebase(APP_SETTINGS.FIREBASE_URL).child("tasks");

    var tasks = tasksRef.orderByChild("user_id").equalTo($rootScope.user.id); //orderByChild("timestamp") //.limitToLast(10)

    return $firebaseArray(tasks);

    // return HomeFactory = {
    //   getTasks: getTasks,
    //   addTask: addTask,
    //   saveTask: saveTask,
    //   removeTask: removeTask
    // };

    // function getTasks() {
    //   var tasks = new Firebase(urlBase + "/tasks");
    //   HomeFactory.tasks = $firebaseArray(tasks);
    //   return HomeFactory.tasks;
    // }

    // function addTask( obj ) {
    //   var tasks = new Firebase(urlBase + "/tasks");
    //   HomeFactory.tasks = $firebaseArray(tasks);
    //   HomeFactory.tasks.$add({
    //     title: obj.title,
    //     description: obj.description,
    //     listId: obj.listId
    //   });
    //   return HomeFactory.tasks;
    // }

    // function saveTask( obj ) {
    //   HomeFactory.tasks.$save(obj);
    // }

    // function removeTask( obj ) {
    //   HomeFactory.tasks.$remove(obj);
    // }

  }

  angular
  .module('fourlists')
  .factory('HomeFactory', HomeFactory);

  HomeFactory.$inject = ['$rootScope', 'APP_SETTINGS', '$firebaseArray'];
})();