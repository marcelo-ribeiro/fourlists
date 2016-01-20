(function() {
  'use strict';

  function ProfileController( $rootScope, UserFactory, $state ) {

    var vm = this;

    vm.authObj = UserFactory;

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

  ProfileController.$inject = ['$rootScope', 'UserFactory', '$state'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();