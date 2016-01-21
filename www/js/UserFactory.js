(function () {
  'use strict';

  function UserFactory( $rootScope, $state, APP_SETTINGS, $firebaseAuth ) {

    var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);

    var authObj = $firebaseAuth(ref);

    $rootScope.user = null;


    return {
      googleLogin: googleLogin,
      logout: logout,
      getAuth: getAuth
    };


    function googleLogin () {
      authObj.$authWithOAuthPopup("google")
        .then(function(authData) {
          setUser(authData);
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
      var authData = authObj.$getAuth();

      console.log('authData', authData);

      if (authData) {
        console.log("Authenticated user with uid:", authData.uid);
        setUser(authData);
      }
      else {
        console.log("Logged out");
      }
    }


    function setUser(authData) {
      $rootScope.user = {
        id: authData.uid,
        name: authData.google.displayName
      };
      console.log('user: ', $rootScope.user);

      $state.go('lists');
    }


  }

  angular
  .module('fourlists')
  .factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$rootScope', '$state', 'APP_SETTINGS', '$firebaseAuth'];
})();