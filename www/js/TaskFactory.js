(function () {
  'use strict';

  function TaskFactory( $rootScope, APP_SETTINGS, $firebaseArray ) {

    // var priority = 10000000000;

    var tasksRef = new Firebase(APP_SETTINGS.FIREBASE_URL).child("tasks");

    var query = tasksRef.orderByChild("user_id").equalTo($rootScope.user.id);

    var tasks = $firebaseArray(query);

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
      return tasks.$loaded();
    }

    function add( obj ) {
      return tasks.$add({
        title: obj.title,
        description: obj.description,
        list_id: obj.list_id,
        user_id: obj.user_id
      });
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