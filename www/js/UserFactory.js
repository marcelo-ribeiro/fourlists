(function () {
  'use strict';

  function UserFactory( $rootScope, $state, APP_SETTINGS, $firebaseAuth, $window ) {

    var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);

    var authObj = $firebaseAuth(ref);

    $rootScope.user = null;


    return {
      authRef: getAuthRef,
      googleLogin: googleLogin,
      logout: logout,
      getAuth: getAuth,
      redirectUser: redirectUser
    };


    function getAuthRef () {
      return authObj;
    }


    function googleLogin () {
      authObj.$authWithOAuthPopup("google")
      .then(function(authData) {
        setUser(authData);
        $state.go('lists');
      }
      // ,{
      // remember: "sessionOnly",
      // scope: "email"
      // }
      )
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
      console.log('getingAuth'); //debug

      var authData = authObj.$getAuth();

      if (authData) {
        console.log("Has Auth:", authData); //debug
        setUser(authData);
      }
      else {
        console.log("No authData"); //debug
      }
    }


    function setUser(authData) {

      // if ( $rootScope.user == null ) {
        // console.log('$rootScope.user == null'); //debug
        $rootScope.user = {
          id: authData.uid,
          name: authData.google.displayName
        };
      // }

      console.log('setingUser - User: ', $rootScope.user); //debug

      redirectUser();
    }


    function redirectUser(){
      console.log('verify need redirectUser');
      console.log('state:', $state);

      if ( $rootScope.user == null && $state.current.name != 'login' ) {
        console.log('$rootScope.user == null && toState.name != login')
        event.preventDefault();
        $window.location = '#/login';
      }

      if ( $rootScope.user !== null && $state.current.name == "login" ) {
        // event.preventDefault();
        console.log('Has user and state is login');
        $window.location = '#/lists';
        $state.go('lists');
      }
      // else{
      //   console.log('not need redirectUser');
      // }
    }


  }

  angular
  .module('fourlists')
  .factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$rootScope', '$state', 'APP_SETTINGS', '$firebaseAuth', '$window'];
})();