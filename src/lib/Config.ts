module client
{
	'use strict';

	/**
	* Configures the Angular application
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

			// if the path doesn't match any of the urls you configured
			// 'otherwise' will take care of routing back to the index
			routeProvider.otherwise("/");

			stateProvider.state("home", { url: "/", templateUrl: "templates/home.html", controller: "homeCtrl", controllerAs: "controller" });
			stateProvider.state("about", { url: "/about", templateUrl: "templates/about.html" });
			stateProvider.state("contact", { url: "/contact", templateUrl: "templates/contact.html", controller: "contactCtrl", controllerAs: "controller" });
            stateProvider.state("projects", { url: "/projects", templateUrl: "templates/projects.html" });
            stateProvider.state("blog", {
                url: "/blog?author&category&tag&index", templateUrl: "templates/blog.html", controller: "blogCtrl", controllerAs: "controller",
                resolve: {
                    categories: ["$http", "apiURL", function ($http: ng.IHttpService, apiURL: string)
                    {
                        return $http.get<Webinate.IGetCategories>(`${apiURL}/posts/get-categories`).then(function (categories)
                        {
                            return categories.data.data;
                        });
                    }]
                }
            });
            stateProvider.state("post", {
                url: "/post/:slug", templateUrl: "templates/post.html",
                    resolve: {
                        post: ["$http", "apiURL", "$stateParams", function ($http: ng.IHttpService, apiURL: string, stateParams)
                        {
                            return $http.get<Webinate.IGetPost>(`${apiURL}/posts/get-post/${stateParams.slug}`).then(function (posts)
                            {
                                return posts.data.data;
                            });
                        }]
                },
                controller: ["$scope", "post", "$sce", function (scope: any, post: Webinate.IPost, sce: ng.ISCEService)
                {
                    scope.post = post;
                    scope.post.content = sce.getTrustedHtml(scope.post.content);
                }]
            });
                
		}
	}
}