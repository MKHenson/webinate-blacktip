module blacktip
{
    /**
    * A class bound to the meta tags of the site. You can call this object in controllers with the dependency "meta"
    */
    export class Meta
    {
        public description: string;
        public title: string;
        public brief: string;
        public smallImage: string;
        public bigImage: string;
        public author: string;
        public website: string;
        public url: string;
        public twitterAuthor: string;
        public twitterSite: string;

        /**
        * Creates an instance of the meta class
        */
        constructor()
        {
            this.defaults();
        }

        /**
        * Sets the values to their default state
        */
        defaults()
        {
            this.description = "Webinate is a development studio who offer web development, application development, developer hire and gamification. Please contact us at sales@webinate.net";
            this.title = "Webinate"
            this.brief = this.description;
            this.smallImage = _url + "/media/images/logo-home-large.png";
            this.bigImage = _url + "/media/images/logo-home-large.png";
            this.author = "Webinate";
            this.website = "Webinate.net";
            this.url = this.url || "https://webinate.net";
            this.twitterAuthor = "@MathewKHenson";
            this.twitterSite = "@WebinateNet";
        }
    }
}