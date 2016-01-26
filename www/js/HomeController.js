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

    vm.openTaskModal = function (item) {
      $state.go('editTask',{taskId: item.$id});
    }


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