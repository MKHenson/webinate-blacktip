module client
{
	'use strict';

	/**
	 * Controller for the blog page
	 */
    export class BlogCtrl
	{
		// An array of todo items
        private http: ng.IHttpService;
        public posts: Array<Webinate.IPost>;
        public categories: Array<Webinate.ICategory>;
        public apiURL: string;

        public author: string;
        public category: string;
        public tag: string;
        public index: number;
        public limit: number;
        public last: number;

		// The dependency injector
        public static $inject = ["$http", "apiURL", "$stateParams", "categories" ];

		/**
		* Creates an instance of the home controller
		*/
        constructor(http: ng.IHttpService, apiURL: string, stateParams: any, categories: Array<Webinate.ICategory>)
		{
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;

            this.limit = 5;
            this.index = parseInt(stateParams.index) || 0;
            this.last = Infinity;

            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.categories = categories;
            this.getPosts();
        }

        /**
        * Sets the page search back to index = 0
        */
        goNext()
        {
            this.index += this.limit;
            this.getPosts();
        }

        /**
        * Sets the page search back to index = 0
        */
        goPrev()
        {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.getPosts();
        }

        getBlogImageURL(post: Webinate.IPost)
        {
            var url = "/media/images/camera.jpg";
            if (post.featuredImage && post.featuredImage != "")
                url = post.featuredImage;
            
            return {
                "background-image": "url('" + url + "')"
            }
        }

        getPosts()
        {
            var that = this;
            this.http.get<Webinate.IGetPosts>(`${this.apiURL}/posts/get-posts?tags=${that.tag}&index=${that.index}&limit=${that.limit}&author=${that.author}&categories=${that.category}&minimal=true`).then(function (posts)
            {
                that.posts = posts.data.data;
                that.last = posts.data.count;
            });
        }
	}
}