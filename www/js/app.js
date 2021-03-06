angular.module('fourlists', ['ionic', 'firebase', 'ngCordova']) //, 'angular.filter'


.constant( 'APP_SETTINGS', {
  FIREBASE_URL: 'https://fourlists.firebaseio.com'
})


.config(function ($stateProvider, $urlRouterProvider, $logProvider, $compileProvider, $ionicConfigProvider) {

  $logProvider.debugEnabled(false);
  $compileProvider.debugInfoEnabled(false);
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginController as vm'
  })

  .state('lists', {
    url: "/",
    templateUrl: "templates/home.html",
    controller: 'HomeController as vm',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["UserFactory", function(UserFactory) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return UserFactory.authRef().$requireAuth();
      }]
    }
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
    url: "/profile",
    templateUrl: "templates/profile.html",
    controller: 'ProfileController as vm'
  })

  $urlRouterProvider.otherwise('/login');

})

.run( function( $rootScope, $window, $ionicPlatform, $state, UserFactory, $cordovaNetwork ) {

  $ionicPlatform.ready(function() {
    console.log('$ionicPlatform.ready');

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


  // Check internet conection
  document.addEventListener("deviceready", function () {
    console.log('deviceready');

    var type = $cordovaNetwork.getNetwork();
    var isOnline = $cordovaNetwork.isOnline();
    var isOffline = $cordovaNetwork.isOffline();

    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      console.log('networkState:', networkState);
      var onlineState = networkState;
      UserFactory.goOffline();
    });

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      console.log('networkState:', networkState);
      var offlineState = networkState;
      UserFactory.goOffline();
    });

  }, false);


  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log('$stateChangeStart');
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    console.log('$stateChangeSuccess');

    UserFactory.getAuth();

    $rootScope.goBack = function() {
      $state.go(fromState, fromParams);
    };

    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
      if ( $state.current.name=="lists" ) {
        ionic.Platform.exitApp();
      }
      else
        $rootScope.goBack();
    }, 101);

  });

  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the login page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });

});
