namespace blacktip {
    'use strict';

    /**
     * Controller for the blog page
     */
    export class BlogCtrl {
        // An array of todo items
        private http: ng.IHttpService;
        public posts: Array<Modepress.IPost>;
        public categories: Array<Modepress.ICategory>;
        public apiURL: string;
        private signaller: Function;

        public author: string;
        public category: string;
        public tag: string;
        public index: number;
        public limit: number;
        public last: number;

        // The dependency injector
        public static $inject = [ '$http', 'apiURL', '$stateParams', 'categories', 'signaller', 'meta' ];

		/**
		 * Creates an instance of the home controller
		 */
        constructor( http: ng.IHttpService, apiURL: string, stateParams: any, categories: Modepress.IGetCategories, signaller: Function, meta: Meta ) {
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;
            this.signaller = signaller;

            this.limit = 12;
            this.index = parseInt( stateParams.index ) || 0;
            this.last = 1;

            this.author = stateParams.author || '';
            this.category = stateParams.category || '';
            this.tag = stateParams.tag || '';
            this.categories = categories.data;

            meta.defaults();
            meta.description = 'Webinate app and mobile apps development blog - here you will find up to date information on what\'s happening at the webinate studio';
            meta.brief = meta.description;
        }

        /**
         * Sets the page search back to index = 0
         */
        goNext() {
            this.index += this.limit;
            this.getPosts();
        }

        /**
         * Sets the page search back to index = 0
         */
        goPrev() {
            this.index -= this.limit;
            if ( this.index < 0 )
                this.index = 0;

            this.getPosts();
        }

        getBlogImageURL( post: Modepress.IPost ) {
            let url = '/media/images/camera.jpg';
            if ( post.featuredImage && post.featuredImage !== '' )
                url = post.featuredImage;

            return {
                'background-image': 'url(\'' + url + '\')'
            }
        }

        getPosts() {
            this.posts = [];
            this.http.get<Modepress.IGetPosts>( `${this.apiURL}/posts?visibility=public&tags=${this.tag}&rtags=webinate&index=${this.index}&limit=${this.limit}&author=${this.author}&categories=${this.category}&minimal=true` ).then(( posts ) => {
                this.posts = posts.data!.data;
                this.last = posts.data!.count;

                this.signaller();
            });
        }
    }
}