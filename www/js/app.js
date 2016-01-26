angular.module('fourlists', ['ionic', 'firebase'])


.constant( 'APP_SETTINGS', {
  FIREBASE_URL: 'https://fourlists.firebaseio.com'
})


.run( function( $rootScope, $window, $ionicPlatform, $state, UserFactory ) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });

  UserFactory.getAuth();

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    UserFactory.redirectUser();
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.goBack = function() {
      $state.go(fromState, fromParams);
    }
  });

})


.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginController as vm'
  })

  .state('lists', {
    url: "/",
    templateUrl: "templates/home.html",
    controller: 'HomeController as vm'
  })
  .state('lists.list', {
    url: "list/:listId",
    params: {
      listId: { value: '', squash: true }
    }
  })

  .state('addTask', {
    url: "addTask/:listId",
    templateUrl: "templates/modal.html",
    controller: 'ModalController as vm',
    params: {
      listId: { value: null, squash: true }
    }
  })

  .state('editTask', {
    url: "editTask/:taskId",
    templateUrl: "templates/modal.html",
    controller: 'ModalController as vm',
    params: {
      taskId: { value: '', squash: true }
    }
  })

  .state('profile', {
    url: "profile",
    templateUrl: "templates/profile.html",
    controller: 'ProfileController as vm'
  })

  $urlRouterProvider.otherwise('/lists');

});
