(function () {
  'use strict';

  function TaskFactory( $rootScope, APP_SETTINGS, $firebaseArray ) {

    var tasksRef = new Firebase(APP_SETTINGS.FIREBASE_URL).child("tasks");

    var tasksByUserId = tasksRef.orderByChild("user_id").equalTo($rootScope.user.id); //orderByChild("timestamp") //.limitToLast(10)

    var tasks = $firebaseArray(tasksByUserId);

    return {
      getLists: getLists,
      getAll: getAll,
      add: add,
      save: save,
      remove: remove,
      getById: getById
    };

    function getLists() {
      return [
        { id: 1, title: 'Importante e Urgente' },
        { id: 2, title: 'Importante' },
        { id: 3, title: 'Urgente' },
        { id: 4, title: 'Outros' }
      ];
    }

    function getAll() {
      return tasks;
    }

    function add( obj ) {
      tasks.$add({
        title: obj.title,
        description: obj.description,
        listId: obj.listId
      });
      return tasks;
    }

    function save( obj ) {
      return tasks.$save(obj);
    }

    function remove( obj ) {
      return tasks.$remove(obj);
    }

    function getById( taskId ) {
      return tasks.$getRecord(taskId);
    }

  }

  angular
  .module('fourlists')
  .factory('TaskFactory', TaskFactory);

  TaskFactory.$inject = ['$rootScope', 'APP_SETTINGS', '$firebaseArray'];
})();