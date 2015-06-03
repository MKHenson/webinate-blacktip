/**
 * The main entry point of the application
 */
module blacktip
{
    'use strict';

    angular.module("modepress", ["ui.router", 'ngSanitize'])
        .config(Config)
        .constant("apiURL", "./api")
        .controller("homeCtrl", HomeCtrl)
        .controller("blogCtrl", BlogCtrl)
		.controller("contactCtrl", ContactCtrl)
}