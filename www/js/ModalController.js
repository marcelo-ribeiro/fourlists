(function () {
  'use strict';

  function ModalController( $rootScope, TaskFactory, $state ) {

    var vm = this;


    init();
    function init() {
      vm.task = {};
      getLists();

      if (vm.isEdit)
        getTask($state.params.taskId);
    }


    vm.isEdit = function () {
      if ($state.params.taskId)
        return true;
      return false;
    }


    function getLists() {
      vm.lists = TaskFactory.getLists();
    };


    function getTask(task) {
      // vm.processingAdd = false;
      vm.task = TaskFactory.getById( task );
    };


    vm.setList = function (id) {
      vm.task.list_id = id;
    };


    vm.add = function (task) {
      vm.processingAdd = true;

      vm.task.user_id = $rootScope.user.id;
      vm.task.description = vm.task.description || '';

      TaskFactory.add( vm.task )
      .then(function() {

      })
      .catch( function( error ) {
        console.log('Error add');
      })
      .finally( function() {
        vm.processingAdd = false;
        vm.task = {};
        $state.go('lists');
      });
    };


    vm.save = function (task) {
      TaskFactory.save(task);
      $state.go('lists');
    };


    vm.remove = function (task) {
      TaskFactory.remove(task);
    };


  }

  angular
  .module('fourlists')
  .controller('ModalController', ModalController);

  ModalController.$inject = ['$rootScope', 'TaskFactory', '$state'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();