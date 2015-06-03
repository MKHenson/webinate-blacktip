module blacktip
{
	'use strict';

	/**
	 * Controller for the contact us page
	 */
	export class ContactCtrl
	{
		// An array of todo items
		private http: ng.IHttpService;
        private mail: modepress.IMessage;

		// The dependency injector
		public static $inject = ["$http" ];

		/**
		* Creates an instance of the home controller
		*/
		constructor( http: ng.IHttpService )
		{
			this.http = http;
			this.mail = { email: "", name: "", message : "" };

			// Create the map object and center it on the premise
			var geocoder = new google.maps.Geocoder();
			var map = new google.maps.Map( jQuery(".map").get(0), {
				zoom: 10,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			geocoder.geocode({ 'address': "57 The Headlands, Bray, Ireland" }, function (results, status)
			{
				if (status == google.maps.GeocoderStatus.OK)
				{
					map.setCenter(results[0].geometry.location);
					new google.maps.Marker({ map: map, position: results[0].geometry.location });
				}
			});
		}

		/*
		* Sends an email to the modepress admin
		*/
		sendMessage()
		{
			var details = this.mail;
			jQuery(".success").hide();
			jQuery(".error").hide();
			jQuery("#contact-form .submit").prop('disabled', true);

			this.http.post("/api/message-admin", details).then((response: ng.IHttpPromiseCallbackArg<any>) =>
			{
				// Check for any errors
				if (response.data.error)
				{
					jQuery(".error").show().text(response.data.message);
					return;
				}
				else
				{
					jQuery(".success").show().text(response.data.message);
				}
			}).catch(function (error: Error)
			{
                jQuery(".error").show().text(`Oh dear, there seems to be an error with our server.
                    Please try again or send us an email and we'll try get back to you as soon as possible`);

			}).finally(function ()
			{
				jQuery("#contact-form .submit").prop('disabled', false);
			});
		}
	}
}