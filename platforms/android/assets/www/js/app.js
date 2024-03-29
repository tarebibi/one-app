// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.infrastructure', {
      url: '/infrastructure',
      views: {
        'tab-infrastructure': {
          templateUrl: 'templates/tab-infrastructure.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.menu', {
      url: '/menu',
      views: {
        'tab-menu': {
          templateUrl: 'templates/tab-menu.html',
          controller: 'ReportCtrl'
        }
      }
    })
    
    .state('tab.elections', {
      url: '/elections',
      views: {
        'tab-elections': {
          templateUrl: 'templates/tab-elections.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.traffic', {
      url: '/traffic',
      views: {
        'tab-traffic': {
          templateUrl: 'templates/tab-traffic.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.crime', {
      url: '/crime',
      views: {
        'tab-crime': {
          templateUrl: 'templates/tab-crime.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.register', {
      url: '/register',
      views: {
        'tab-register': {
          templateUrl: 'templates/tab-register.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('tab.resetpassword', {
      url: '/resetpassword',
      views: {
        'tab-resetpassword': {
          templateUrl: 'templates/tab-resetpassword.html',
          controller: 'ReportCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});

