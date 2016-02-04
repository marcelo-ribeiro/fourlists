(function () {
  'use strict';

  function UserFactory( $rootScope, $state, APP_SETTINGS, $firebaseAuth ) {

    var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);

    var authObj = $firebaseAuth(ref);

    $rootScope.user = null;


    return {
      googleLogin: googleLogin,
      logout: logout,
      getAuth: getAuth,
      redirectUser: redirectUser
    };


    function googleLogin () {
      authObj.$authWithOAuthPopup("google")
      .then(function(authData) {
        setUser(authData);
        $state.go('lists');
      })
      .catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };


    function logout () {
      authObj.$unauth();
      $rootScope.user = null;
      localStorage.removeItem("firebase:session::fourlists");
      console.log('User is logged out');
      $state.go('login');
    };


    function getAuth() {
      console.log('getingAuth');

      var authData = authObj.$getAuth();

      if (authData) {
        console.log("Authenticated user with uid:", authData.uid);
        setUser(authData);
        // redirectUser();
      }
      else {
        console.log("No authData");
      }
    }


    function setUser(authData) {
      $rootScope.user = {
        id: authData.uid,
        name: authData.google.displayName
      };
      console.log('setingUser - User: ', $rootScope.user);
    }


    function redirectUser(){
      console.log('verify need redirectUser');
      if ( $rootScope.user == null && $state.is != 'login' ) {
        console.log('$rootScope.user == null && toState.name != login')
        event.preventDefault();
        $window.location = '#/login';
      }
      else if ( $rootScope.user && $state.is == 'login' ) {
        event.preventDefault();
        $window.location = '#/lists';
      }
      else{
        console.log('not need redirectUser');
      }
    }


  }

  angular
  .module('fourlists')
  .factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$rootScope', '$state', 'APP_SETTINGS', '$firebaseAuth'];
})();