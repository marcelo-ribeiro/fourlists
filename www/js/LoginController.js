(function() {
  'use strict';

  function LoginController( UserFactory ) {

    var vm = this;

    vm.googleLogin = googleLogin;

    vm.logout = logout;


    // Initialize
    // init();
    (function init() {
    })();


    function googleLogin () {
      UserFactory.googleLogin();
    };


    function logout () {
      UserFactory.logout();
    };


  }

  angular
    .module('fourlists')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserFactory'];

  // angular.module('SharedModule')
  //  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {

  //    $translatePartialLoaderProvider.addPart('openAccount/simpleAccount/initialData/initialData');

  //  }]);

})();