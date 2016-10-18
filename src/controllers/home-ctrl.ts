module blacktip {
    'use strict';

    /**
     * Controller for managing the
     */
    export class HomeCtrl {
        private _resizeProxy: any;
        private _slider: $JssorSlider$;
        private _signaller: Function;

        // The dependency injector
        public static $inject = [ "$scope", "signaller", "meta" ];

		/**
		 * Creates an instance of the home controller
		 */
        constructor( scope: ng.IScope, signaller: Function, meta: Meta ) {
            var that = this;
            this._resizeProxy = this.scaleSlider.bind( this );
            this._slider = null;
            this._signaller = signaller;

            // Set the default meta tags
            meta.defaults();

            scope.$on( "$destroy", function() { that.onDestroy(); });
        }

        /**
         * Cleans up the controller
         */
        onDestroy() {
            $( window ).unbind( "load", this._resizeProxy );
            $( window ).unbind( "resize", this._resizeProxy );
            $( window ).unbind( "orientationchange", this._resizeProxy );

            this._resizeProxy = null;
            this._slider = null;
        }

        /**
         * Resizes the slider if the window is resized
         */
        private scaleSlider() {
            var parentWidth = jQuery( ".slider-monitor" ).width();
            if ( parentWidth )
                this._slider.$ScaleWidth( parentWidth );
            else
                window.setTimeout( this._resizeProxy, 30 );
        }

		/**
		 * Called after the home content is loaded
		 */
        loadSlider() {
            var _SlideshowTransitions = [
                { $Duration: 1200, $Opacity: 2 }
            ];

            var _CaptionTransitions: Array<any> = [];
            _CaptionTransitions[ "FADE_IN" ] = { $Duration: 1200, $Clip: 15, $Opacity: 1.7, $During: { $Clip: [ 0.5, 0.5 ], $Opacity: [ 0, 0.5 ] } };
            _CaptionTransitions[ "LEFT_MARCH" ] = { $Duration: 400, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions[ "ATTACK_RIGHT" ] = { $Duration: 1500, x: -0.5, y: 0.1, $Zoom: 1, $Easing: { $Left: $JssorEasing$.$EaseInExpo, $Top: $JssorEasing$.$EaseOutWave }, $Opacity: 2, $During: { $Left: [ 0, 0.7 ], $Top: [ 0.3, 0.7 ] }, $Round: { $Top: 1.3 } };

            var options = {
                $FillMode: 2,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
                $AutoPlayInterval: 5000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

                $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
                $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
                $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
                $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
                $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
                $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

                $SlideshowOptions: {                                //[Optional] Options to specify and enable slideshow or not
                    $Class: $JssorSlideshowRunner$,                 //[Required] Class to create instance of slideshow
                    $Transitions: _SlideshowTransitions,            //[Required] An array of slideshow transitions to play slideshow
                    $TransitionsOrder: 1,                           //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
                    $ShowLink: true                                 //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
                },

                $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                    $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                    $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                    $SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                    $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                    $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },

                $CaptionSliderOptions: {                            //[Optional] Options which specifies how to animate caption
                    $Class: $JssorCaptionSlideo$,                   //[Required] Class to create instance to animate caption
                    $Transitions: _CaptionTransitions,              //[Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder
                    $PlayInMode: 1,                                 //[Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1
                    $PlayOutMode: 3                                 //[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
                }
            };

            this._slider = new $JssorSlider$( "slides", options );

            this.scaleSlider();
            $( window ).bind( "load", this._resizeProxy );
            $( window ).bind( "resize", this._resizeProxy );
            $( window ).bind( "orientationchange", this._resizeProxy );

            this._signaller();
        }
    }
}