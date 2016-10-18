namespace blacktip {
    'use strict';

    /**
     * Controller for managing the
     */
    export class HomeCtrl {
        private _resizeProxy: any;
        private _slider: $JssorSlider$;
        private _signaller: Function;

        // The dependency injector
        public static $inject = [ '$scope', 'signaller', 'meta' ];

		/**
		 * Creates an instance of the home controller
		 */
        constructor( scope: ng.IScope, signaller: Function, meta: Meta ) {
            this._resizeProxy = this.scaleSlider.bind( this );
            this._slider = null;
            this._signaller = signaller;

            // Set the default meta tags
            meta.defaults();

            scope.$on( '$destroy', function() { this.onDestroy(); });
        }

        /**
         * Cleans up the controller
         */
        onDestroy() {
            $( window ).unbind( 'load', this._resizeProxy );
            $( window ).unbind( 'resize', this._resizeProxy );
            $( window ).unbind( 'orientationchange', this._resizeProxy );

            this._resizeProxy = null;
            this._slider = null;
        }

        /**
         * Resizes the slider if the window is resized
         */
        private scaleSlider() {
            const parentWidth = jQuery( '.slider-monitor' ).width();
            if ( parentWidth )
                this._slider.$ScaleWidth( parentWidth );
            else
                window.setTimeout( this._resizeProxy, 30 );
        }

		/**
		 * Called after the home content is loaded
		 */
        loadSlider() {
            const _SlideshowTransitions = [
                { $Duration: 1200, $Opacity: 2 }
            ];

            const _CaptionTransitions: Array<any> = [];
            _CaptionTransitions[ 'FADE_IN' ] = { $Duration: 1200, $Clip: 15, $Opacity: 1.7, $During: { $Clip: [ 0.5, 0.5 ], $Opacity: [ 0, 0.5 ] } };
            _CaptionTransitions[ 'LEFT_MARCH' ] = { $Duration: 400, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions[ 'ATTACK_RIGHT' ] = { $Duration: 1500, x: -0.5, y: 0.1, $Zoom: 1, $Easing: { $Left: $JssorEasing$.$EaseInExpo, $Top: $JssorEasing$.$EaseOutWave }, $Opacity: 2, $During: { $Left: [ 0, 0.7 ], $Top: [ 0.3, 0.7 ] }, $Round: { $Top: 1.3 } };

            const options = {
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
                    $ShowLink: true
                },
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2,
                    $AutoCenter: 1,
                    $Steps: 1,
                    $Lanes: 1,
                    $SpacingX: 10,
                    $SpacingY: 10,
                    $Orientation: 1
                },
                $CaptionSliderOptions: {
                    $Class: $JssorCaptionSlideo$,
                    $Transitions: _CaptionTransitions,
                    $PlayInMode: 1,
                    $PlayOutMode: 3
                }
            };

            this._slider = new $JssorSlider$( 'slides', options );

            this.scaleSlider();
            $( window ).bind( 'load', this._resizeProxy );
            $( window ).bind( 'resize', this._resizeProxy );
            $( window ).bind( 'orientationchange', this._resizeProxy );

            this._signaller();
        }
    }
}