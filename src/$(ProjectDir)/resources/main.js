var blacktip;
(function (blacktip) {
    /**
    * A class bound to the meta tags of the site. You can call this object in controllers with the dependency "meta"
    */
    var Meta = (function () {
        /**
        * Creates an instance of the meta class
        */
        function Meta() {
            this.defaults();
        }
        /**
        * Sets the values to their default state
        */
        Meta.prototype.defaults = function () {
            this.description = "Offering web and mobile app design and development, with an experienced team located in Dublin. Full cycle development and developers for hire. Contact us at sales@webinate.net";
            this.title = "Webinate";
            this.brief = this.description;
            this.smallImage = _url + "/media/images/logo-home-large.png";
            this.bigImage = _url + "/media/images/logo-home-large.png";
            this.author = "Webinate";
            this.website = "Webinate.net";
            this.url = this.url || "https://webinate.net";
            this.twitterAuthor = "@MathewKHenson";
            this.twitterSite = "@WebinateNet";
        };
        return Meta;
    })();
    blacktip.Meta = Meta;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Configures the application
    */
    var Config = (function () {
        /**
        * Creates an instance of the config
        */
        function Config(routeProvider, stateProvider, $locationProvider) {
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
                    categories: ["$http", "apiURL", function ($http, apiURL) {
                            return $http.get(apiURL + "/posts/get-categories").then(function (categories) {
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
                    post: ["$http", "apiURL", "$stateParams", function ($http, apiURL, stateParams) {
                            return $http.get(apiURL + "/posts/get-post/" + stateParams.slug).then(function (posts) {
                                if (posts.data.error)
                                    return posts.data;
                                return posts.data.data;
                            });
                        }]
                },
                controller: "postCtrl"
            });
        }
        Config.$inject = ["$urlRouterProvider", "$stateProvider", "$locationProvider"];
        return Config;
    })();
    blacktip.Config = Config;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Controller for single post pages
    */
    var PostCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function PostCtrl(scope, post, sce, signaller, meta) {
            meta.title = post.title;
            meta.bigImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.smallImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.description = (post.brief && post.brief != "" ? post.brief : "");
            meta.brief = (post.brief && post.brief != "" ? post.brief : "");
            // If no brief, then get the text content of the post itself
            if (meta.brief == "") {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = post.content;
                meta.description = tmp.textContent || tmp.innerText || "";
                //Trim
                meta.description = meta.description.replace(/^\s+|\s+$/g, '');
                // Remove nbsp
                meta.description = meta.description.replace(new RegExp(String.fromCharCode(160), "g"), " ");
                // Limit length
                meta.description = meta.description.substr(0, 155);
                //This javascript replaces all 3 types of line breaks with a space
                meta.description = meta.description.replace(/(\r\n|\n|\r)/gm, " ");
                //Replace all double white spaces with single spaces
                meta.description = meta.description.replace(/\s+/g, " ");
                meta.brief = meta.description;
            }
            scope.post = post;
            scope.post.content = sce.trustAsHtml(post.content);
            signaller();
        }
        PostCtrl.$inject = ["$scope", "post", "$sce", "signaller", "meta"];
        return PostCtrl;
    })();
    blacktip.PostCtrl = PostCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Controller for managing the
    */
    var SimpleCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function SimpleCtrl(signaller, meta) {
            meta.defaults();
            signaller();
        }
        SimpleCtrl.$inject = ["signaller", "meta"];
        return SimpleCtrl;
    })();
    blacktip.SimpleCtrl = SimpleCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    var FooterCtrl = (function () {
        function FooterCtrl(scope, http, apiURL) {
            scope.posts = [];
            var that = this;
            http.get(apiURL + "/posts/get-posts?limit=5&minimal=true&tags=webinate&visibility=public").then(function (posts) {
                scope.posts = posts.data.data;
            });
        }
        // The dependency injector
        FooterCtrl.$inject = ["$scope", "$http", "apiURL"];
        return FooterCtrl;
    })();
    blacktip.FooterCtrl = FooterCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Controller for the blog page
    */
    var BlogCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function BlogCtrl(http, apiURL, stateParams, categories, signaller, meta) {
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;
            this.signaller = signaller;
            this.limit = 12;
            this.index = parseInt(stateParams.index) || 0;
            this.last = 1;
            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.categories = categories;
            meta.defaults();
            meta.description = "Webinate app and mobile apps development blog - here you will find up to date information on what's happening at the webinate studio";
            meta.brief = meta.description;
        }
        /**
        * Sets the page search back to index = 0
        */
        BlogCtrl.prototype.goNext = function () {
            this.index += this.limit;
            this.getPosts();
        };
        /**
        * Sets the page search back to index = 0
        */
        BlogCtrl.prototype.goPrev = function () {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.getPosts();
        };
        BlogCtrl.prototype.getBlogImageURL = function (post) {
            var url = "/media/images/camera.jpg";
            if (post.featuredImage && post.featuredImage != "")
                url = post.featuredImage;
            return {
                "background-image": "url('" + url + "')"
            };
        };
        BlogCtrl.prototype.getPosts = function () {
            var that = this;
            that.posts = [];
            this.http.get(this.apiURL + "/posts/get-posts?visibility=public&tags=" + that.tag + "&rtags=webinate&index=" + that.index + "&limit=" + that.limit + "&author=" + that.author + "&categories=" + that.category + "&minimal=true").then(function (posts) {
                that.posts = posts.data.data;
                that.last = posts.data.count;
                that.signaller();
            });
        };
        // The dependency injector
        BlogCtrl.$inject = ["$http", "apiURL", "$stateParams", "categories", "signaller", "meta"];
        return BlogCtrl;
    })();
    blacktip.BlogCtrl = BlogCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Controller for managing the
    */
    var BlogSubCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function BlogSubCtrl(scope, stateParams) {
            scope.controller.index = parseInt(stateParams.index) || 0;
            scope.controller.author = stateParams.author || "";
            scope.controller.category = stateParams.category || "";
            scope.controller.tag = stateParams.tag || "";
            scope.controller.selectedTag = scope.controller.tag;
            scope.controller.getPosts();
        }
        BlogSubCtrl.$inject = ["$scope", "$stateParams"];
        return BlogSubCtrl;
    })();
    blacktip.BlogSubCtrl = BlogSubCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
    * Controller for managing the
    */
    var HomeCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function HomeCtrl(scope, signaller, meta) {
            var that = this;
            this._resizeProxy = this.scaleSlider.bind(this);
            this._slider = null;
            this._signaller = signaller;
            // Set the default meta tags
            meta.defaults();
            scope.$on("$destroy", function () { that.onDestroy(); });
        }
        /**
        * Cleans up the controller
        */
        HomeCtrl.prototype.onDestroy = function () {
            $(window).unbind("load", this._resizeProxy);
            $(window).unbind("resize", this._resizeProxy);
            $(window).unbind("orientationchange", this._resizeProxy);
            this._resizeProxy = null;
            this._slider = null;
        };
        /**
        * Resizes the slider if the window is resized
        */
        HomeCtrl.prototype.scaleSlider = function () {
            var parentWidth = jQuery(".slider-monitor").width();
            if (parentWidth)
                this._slider.$ScaleWidth(parentWidth);
            else
                window.setTimeout(this._resizeProxy, 30);
        };
        /**
        * Called after the home content is loaded
        */
        HomeCtrl.prototype.loadSlider = function () {
            var _SlideshowTransitions = [
                { $Duration: 1200, $Opacity: 2 }
            ];
            var _CaptionTransitions = [];
            _CaptionTransitions["FADE_IN"] = { $Duration: 1200, $Clip: 15, $Opacity: 1.7, $During: { $Clip: [0.5, 0.5], $Opacity: [0, 0.5] } };
            _CaptionTransitions["LEFT_MARCH"] = { $Duration: 400, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions["ATTACK_RIGHT"] = { $Duration: 1500, x: -0.5, y: 0.1, $Zoom: 1, $Easing: { $Left: $JssorEasing$.$EaseInExpo, $Top: $JssorEasing$.$EaseOutWave }, $Opacity: 2, $During: { $Left: [0, 0.7], $Top: [0.3, 0.7] }, $Round: { $Top: 1.3 } };
            var options = {
                $FillMode: 2,
                $AutoPlay: true,
                $AutoPlaySteps: 1,
                $AutoPlayInterval: 5000,
                $PauseOnHover: 1,
                $ArrowKeyNavigation: true,
                $SlideDuration: 500,
                $MinDragOffsetToSlide: 20,
                $SlideSpacing: 0,
                $DisplayPieces: 1,
                $ParkingPosition: 0,
                $UISearchMode: 1,
                $PlayOrientation: 1,
                $DragOrientation: 3,
                $SlideshowOptions: {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: _SlideshowTransitions,
                    $TransitionsOrder: 1,
                    $ShowLink: true //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
                },
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2,
                    $AutoCenter: 1,
                    $Steps: 1,
                    $Lanes: 1,
                    $SpacingX: 10,
                    $SpacingY: 10,
                    $Orientation: 1 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },
                $CaptionSliderOptions: {
                    $Class: $JssorCaptionSlider$,
                    $CaptionTransitions: _CaptionTransitions,
                    $PlayInMode: 1,
                    $PlayOutMode: 3 //[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
                }
            };
            this._slider = new $JssorSlider$("slides", options);
            this.scaleSlider();
            $(window).bind("load", this._resizeProxy);
            $(window).bind("resize", this._resizeProxy);
            $(window).bind("orientationchange", this._resizeProxy);
            this._signaller();
        };
        // The dependency injector
        HomeCtrl.$inject = ["$scope", "signaller", "meta"];
        return HomeCtrl;
    })();
    blacktip.HomeCtrl = HomeCtrl;
})(blacktip || (blacktip = {}));
var blacktip;
(function (blacktip) {
    'use strict';
    /**
     * Controller for the contact us page
     */
    var ContactCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function ContactCtrl(http, signaller, meta) {
            this.http = http;
            this.mail = { email: "", name: "", message: "" };
            ContactCtrl.signaller = signaller;
            meta.defaults();
            // Create a few specific meta tags
            meta.title = "Contact Webinate";
            meta.description = "Experienced web developers for web and mobile app development based in Dublin. Contact us through at sales@webinate.net for more information";
            meta.brief = meta.description;
            // Check if maps was already loaded
            if (window.google && google.maps)
                ContactCtrl.initMap();
            else
                this.lazyLoadGoogleMap();
        }
        /**
        * Dynamically loads google maps instead of it being added in the header
        */
        ContactCtrl.prototype.lazyLoadGoogleMap = function () {
            var that = this;
            var script = $.getScript("https://maps.google.com/maps/api/js?sensor=true&callback=blacktip.ContactCtrl.initMap");
        };
        /**
        * Initializes the map once its ready
        */
        ContactCtrl.initMap = function () {
            // Create the map object and center it on the premise
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map(jQuery(".map").get(0), {
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            geocoder.geocode({
                'address': "Suite 203, I.a.d.t. Media Cube, Kill Ave, Dublin" }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({ map: map, position: results[0].geometry.location });
                }
            });
            ContactCtrl.signaller();
            ContactCtrl.signaller = null;
        };
        /*
        * Sends an email to the modepress admin
        */
        ContactCtrl.prototype.sendMessage = function () {
            var details = this.mail;
            jQuery(".success").hide();
            jQuery(".error").hide();
            jQuery("#contact-form .submit").prop('disabled', true);
            this.http.post("/api/message-admin", details).then(function (response) {
                // Check for any errors
                if (response.data.error) {
                    jQuery(".error").show().text(response.data.message);
                    return;
                }
                else {
                    jQuery(".success").show().text(response.data.message);
                }
            }).catch(function (error) {
                jQuery(".error").show().text("Oh dear, there seems to be an error with our server.\n                    Please try again or send us an email and we'll try get back to you as soon as possible");
            }).finally(function () {
                jQuery("#contact-form .submit").prop('disabled', false);
            });
        };
        // The dependency injector
        ContactCtrl.$inject = ["$http", "signaller", "meta"];
        return ContactCtrl;
    })();
    blacktip.ContactCtrl = ContactCtrl;
})(blacktip || (blacktip = {}));
/**
 * The main entry point of the application
 */
var blacktip;
(function (blacktip) {
    'use strict';
    angular.module("blacktip", ["ui.router", 'ngSanitize', 'angular-loading-bar'])
        .factory("signaller", function () {
        return function () {
            setTimeout(function () {
                window.prerenderReady = true;
            }, 500);
        };
    })
        .factory("meta", ["$rootScope", function (rootScope) {
            return rootScope.meta;
        }])
        .config(blacktip.Config)
        .run(["$rootScope", "$location", "$window", function ($rootScope, $location, $window) {
            // Create the meta object
            $rootScope.meta = new blacktip.Meta();
            var state = "home";
            $rootScope.getCurrentState = function () {
                return ["state-" + state];
            };
            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                if (!$window.ga)
                    return;
                state = toState.name;
                // Update meta URL
                $rootScope.meta.url = $location.absUrl();
                $window.ga('send', 'pageview', { page: $location.path() });
                window.scrollTo(0, 0);
            });
        }])
        .constant("apiURL", "./api")
        .controller("simpleCtrl", blacktip.SimpleCtrl)
        .controller("postCtrl", blacktip.PostCtrl)
        .controller("footerCtrl", blacktip.FooterCtrl)
        .controller("homeCtrl", blacktip.HomeCtrl)
        .controller("blogSubCtrl", blacktip.BlogSubCtrl)
        .controller("blogCtrl", blacktip.BlogCtrl)
        .controller("contactCtrl", blacktip.ContactCtrl);
})(blacktip || (blacktip = {}));
/// <reference path="lib/definitions/jquery.d.ts" />
/// <reference path="lib/definitions/angular.d.ts" />
/// <reference path="lib/definitions/angular-ui-router.d.ts" />
/// <reference path="lib/definitions/jssor.d.ts" />
/// <reference path="lib/definitions/modepress.d.ts" />
/// <reference path="lib/Meta.ts" />
/// <reference path="lib/Config.ts" />
/// <reference path="lib/controllers/PostCtrl.ts" />
/// <reference path="lib/controllers/SimpleCtrl.ts" />
/// <reference path="lib/controllers/FooterCtrl.ts" />
/// <reference path="lib/controllers/BlogCtrl.ts" />
/// <reference path="lib/controllers/BlogSubCtrl.ts" />
/// <reference path="lib/controllers/HomeCtrl.ts" />
/// <reference path="lib/controllers/ContactCtrl.ts" />
/// <reference path="lib/Application.ts" /> 
