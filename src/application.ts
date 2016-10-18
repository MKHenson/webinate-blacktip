declare var _url: string;

/**
 * The main entry point of the application
 */
module blacktip {
    'use strict';

    angular.module( "blacktip", [ "ui.router", 'ngSanitize', 'angular-loading-bar', "admin-templates", "modepress-client" ] )
        .value( 'apiUrl', '.' )
        .factory( "signaller", function() {
            return function() {
                setTimeout( function() {
                    ( <any>window ).prerenderReady = true;
                }, 500 );
            }
        })
        .factory( "meta", [ "$rootScope", function( rootScope ) {
            return rootScope.meta;
        }] )
        .config( Config )
        .run( [ "$rootScope", "$location", "$window", function( $rootScope: any, $location: ng.ILocationService, $window: ng.IWindowService ) {
            // Create the meta object
            $rootScope.meta = new Meta();

            var state: string = "home";
            $rootScope.getCurrentState = function() {
                return [ "state-" + state ];
            }

            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on( '$stateChangeSuccess', function( event, toState ) {
                if ( !( <any>$window ).ga )
                    return;

                state = toState.name;

                // Update meta URL
                ( <Meta>$rootScope.meta ).url = $location.absUrl();

                ( <any>$window ).ga( 'send', 'pageview', { page: $location.path() });

                window.scrollTo( 0, 0 );
            });
        }] )
        .constant( "apiURL", "./api" )
        .controller( "simpleCtrl", SimpleCtrl )
        .controller( "postCtrl", PostCtrl )
        .controller( "footerCtrl", FooterCtrl )
        .controller( "homeCtrl", HomeCtrl )
        .controller( "blogSubCtrl", BlogSubCtrl )
        .controller( "blogCtrl", BlogCtrl )
        .controller( "contactCtrl", ContactCtrl )
}