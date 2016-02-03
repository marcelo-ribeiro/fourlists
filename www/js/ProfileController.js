(function() {
  'use strict';

  function ProfileController( UserFactory ) {

    var vm = this;

    vm.logout = logout;


    // Initialize
    // init();
    (function init() {
    })();


    function logout () {
      UserFactory.logout();
    };


  }

  angular
  .module('fourlists')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['UserFactory'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();