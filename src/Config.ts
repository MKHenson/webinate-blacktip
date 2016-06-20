﻿module blacktip
{
	'use strict';

	/**
	* Configures the application
	*/
	export class Config
	{
        public static $inject = ["$urlRouterProvider", "$stateProvider", "$locationProvider"];

        /**
		* Creates an instance of the config
		*/
        constructor(routeProvider: angular.ui.IUrlRouterProvider, stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider)
        {
            // Creates nice URLs
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');

            // if the path doesn't match any of the urls you configured
            // 'otherwise' will take care of routing back to the index
            routeProvider.otherwise("/");

            // Create the states
            stateProvider.state("home", { url: "/", templateUrl: "templates/home.html", controller: "homeCtrl", controllerAs: "controller" });
            stateProvider.state("about", { url: "/about", templateUrl: "templates/about.html", controller: "simpleCtrl" });
            stateProvider.state("contact", { url: "/contact", templateUrl: "templates/contact.html", controller: "contactCtrl", controllerAs: "controller" });
            stateProvider.state("projects", { url: "/projects", templateUrl: "templates/projects.html", controller: "simpleCtrl" });

            // Prior to the blog state loading, make sure the categories are downloaded
            stateProvider.state("blog", {
                url: "/blog", templateUrl: "templates/blog.html", controller: "blogCtrl", controllerAs: "controller", abstract: true,
                resolve: {
                    categories: ["$http", "apiURL", function ($http: ng.IHttpService, apiURL: string)
                    {
                        return $http.get<Modepress.IGetCategories>(`${apiURL}/posts/get-categories`).then(function (categories)
                        {
                            return categories.data.data;
                        });
                    }]
                }
            });

            stateProvider.state("blog.posts", { url: "?author&category&tag&index", templateUrl: "templates/blog-posts.html", controller: "blogSubCtrl", controllerAs: "subController" });

            // Download the post prior to loading this state
            // then assign the post to the scope
            stateProvider.state("post", {
                url: "/post/:slug", templateUrl: "templates/post.html",
                resolve: {
                    post: ["$http", "apiURL", "$stateParams", function ($http: ng.IHttpService, apiURL: string, stateParams)
                    {
                        return $http.get<Modepress.IGetPost>(`${apiURL}/posts/get-post/${stateParams.slug}`).then(function (posts)
                        {
                            if (posts.data.error)
                                return posts.data;

                            return posts.data.data;
                        });
                    }]
                },
                controller: "postCtrl"
            });
        }
	}
}