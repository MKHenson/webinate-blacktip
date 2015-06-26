﻿declare var _url: string;

/**
 * The main entry point of the application
 */
module blacktip
{
    'use strict';

    angular.module("blacktip", ["ui.router", 'ngSanitize', 'angular-loading-bar'])
        .factory("signaller", function () 
        {
            return function () 
            {
                setTimeout(function () {
                    (<any>window).prerenderReady = true;
                }, 500);
            }
        })
        .factory("scrollTop", function () 
        {
            return function ()
            {
                // Scroll div to top after page is rendered - not even sure why it keeps scrolling down :/
                setTimeout(function ()
                {
                    $(".content-outer")[0].scrollTop = 0;

                }, 50);
            }
        })
        .factory("meta", ["$rootScope", function (rootScope) 
        {
            return rootScope.meta;
        }])
        .config(Config)
        .run(["$rootScope", "$location", "$window", function ($rootScope: any, $location: ng.ILocationService, $window: ng.IWindowService)
        {
            // Create the meta object
            $rootScope.meta = new Meta();

            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on('$stateChangeSuccess', function (event) 
            {
                if (!(<any>$window).ga)
                    return;

                // Update meta URL
                (<Meta>$rootScope.meta).url = $location.absUrl();

                (<any>$window).ga('send', 'pageview', { page: $location.path() });
            });
        }])
        .constant("apiURL", "./api")
        .controller("simpleCtrl", SimpleCtrl)
        .controller("postCtrl", PostCtrl)
        .controller("footerCtrl", FooterCtrl)
        .controller("homeCtrl", HomeCtrl)
        .controller("blogCtrl", BlogCtrl)
        .controller("contactCtrl", ContactCtrl)
}