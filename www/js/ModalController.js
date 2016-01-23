(function () {
  'use strict';

  function ModalController( TaskFactory, $state ) {

    var vm = this;

    getLists();
    editTask($state.params.taskId);

    vm.isEdit = function () {
      if ($state.params.taskId)
        return true;
      return false;
    }

    function getLists() {
      vm.lists = TaskFactory.getLists();
    };

    function editTask(task) {
      // vm.processingAdd = false;
      vm.task = TaskFactory.getById( task );
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

  ModalController.$inject = ['TaskFactory', '$state'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();