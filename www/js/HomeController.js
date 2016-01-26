(function () {
  'use strict';

  function HomeController( $rootScope, TaskFactory, $state ) {

    var vm = this;


    init();
    function init() {
      getLists();
      getTasks();
    };


    function getLists() {
      vm.lists = TaskFactory.getLists();
    };


    function getTasks() {
      vm.processing = true;

      vm.tasks = TaskFactory.getAll();
      vm.tasks.$loaded()
      .then(function(data) {
        console.log('tasks:', data)
      })
      .catch(function(error) {
        console.log("Error:", error);
      })
      .finally(function() {
        vm.processing = false;
      });
    };


    vm.openAddTask = function (list) {
      $state.go('addTask',{listId: list.id});
    }

    vm.openEditTask = function (item) {
      $state.go('editTask',{taskId: item.$id});
    }


  }

  angular
    .module('fourlists')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$rootScope', 'TaskFactory', '$state'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();