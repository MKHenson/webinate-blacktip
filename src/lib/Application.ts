/**
 * The main entry point of the application
 */
module client
{
    'use strict';

    angular.module("webinateApplication", ["ui.router", 'ngSanitize'])
        .config(Config)
        .constant("apiURL", "./api")
        .controller("homeCtrl", HomeCtrl)
        .controller("blogCtrl", BlogCtrl)
		.controller("contactCtrl", ContactCtrl)
}