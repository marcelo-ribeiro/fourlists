(function () {
  'use strict';

  function HomeController( $rootScope, TaskFactory, $state ) {

    var vm = this;


    init();
    function init() {
      // if ( $state.is('editTask') ) {
      //   console.log('edit');
      //   getById( $state.params.taskId );
      // }

      // vm.resetTask();
      console.log($state);
      getLists();
      getTasks();
    };


    function getLists() {
      vm.lists = TaskFactory.getLists();
    };


    function getTasks() {
      // vm.processing = true;
      vm.tasks = TaskFactory.getAll();
      // vm.processing = false;
      // console.log($state);
    };

    vm.addTask = function () {
      vm.processingAdd = true;

      vm.task.listId = vm.listId;
      vm.task.userId = $rootScope.user.id;

      TaskFactory.add( vm.task )
      .then(function(obj) {

      })
      .catch( function() {
        console.log('Error add');
      })
      .finally( function() {
        vm.processingAdd = false;
        vm.task = {};
        $state.go('lists');
      });
    };

    vm.openTaskModal = function (item) {
      $state.go('editTask',{taskId: item.$id});
    }


    vm.openList = function( list, focus ) {
      // if ( list.opened )
      //   return false;

      // list.opened = true;

      // vm.listId = list.id;
      // console.log(list);

      // $state.go( '.list', { listId: list.id } );
    };

    vm.closeList = function( list ) {
      // if ( !list.opened )
      //   return false;

      // list.opened = false;

      $state.go('^');
    };


    // Private functions
    // function deleteObjectProperties( obj, property) {
    //   delete obj.property;
    // }


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