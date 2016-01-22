(function () {
  'use strict';

  function HomeController( $rootScope, HomeFactory, $state ) {

    var vm = this;


    // Default list id
    vm.listId = 1;

    vm.lists = [
      { id: 1, title: 'Importante e Urgente' },
      { id: 2, title: 'Importante' },
      { id: 3, title: 'Urgente' },
      { id: 4, title: 'Outros' }
    ];


    vm.init = function () {
      // vm.resetTask();
      vm.getTasks();
    };


    // vm.resetTask = function() {
    //   vm.task = {
    //     title: '',
    //     description: '',
    //     listId: vm.listId
    //   };
    // };


    vm.getTasks = function () {
      vm.processing = true;

      vm.tasks = HomeFactory;

      vm.tasks.$loaded()
      .then( function() {
        console.log('tasks: ', vm.tasks);
      })
      .catch( function(err) {
        console.error("Error:", err);
      })
      .finally( function() {
        vm.processing = false;
      });

    };

    vm.addTask = function () {
      vm.processingAdd = true;

      vm.task.listId = vm.listId;

      vm.tasks.$add({
        title: vm.task.title,
        description: vm.task.description,
        listId: vm.task.listId,
        user_id: $rootScope.user.id
      })
      .then(function(ref) {

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

    vm.saveTask = function (task, $event) {
      // TODO deleteObjectProperties( task, 'toggleRemoveButton');

      task.title = $event.target.innerText;

      vm.tasks.$save(task);

      // console.log('task: ', task);
    };

    vm.removeTask = function (task) {
      vm.tasks.$remove(task);
    };


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
    function deleteObjectProperties( obj, property) {
      delete obj.property;
    }


    // Initialize
    vm.init();


  }

  angular
    .module('fourlists')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$rootScope', 'HomeFactory', '$state'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();