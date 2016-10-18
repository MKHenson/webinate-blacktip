interface JssorEasings {
    $EaseLinear( t ): number;
    $EaseGoBack( t ): number;
    $EaseSwing( t ): number;
    $EaseInQuad( t ): number;
    $EaseOutQuad( t ): number;
    $EaseInOutQuad( t ): number;
    $EaseInCubic( t ): number;
    $EaseOutCubic( t ): number;
    $EaseInOutCubic( t ): number;
    $EaseInQuart( t ): number;
    $EaseOutQuart( t ): number;
    $EaseInOutQuart( t ): number;
    $EaseInQuint( t ): number;
    $EaseOutQuint( t ): number;
    $EaseInOutQuint( t ): number;
    $EaseInSine( t ): number;
    $EaseOutSine( t ): number;
    $EaseInOutSine( t ): number;
    $EaseInExpo( t ): number;
    $EaseOutExpo( t ): number;
    $EaseInOutExpo( t ): number;
    $EaseInCirc( t ): number;
    $EaseOutCirc( t ): number;
    $EaseInOutCirc( t ): number;
    $EaseInElastic( t ): number;
    $EaseOutElastic( t ): number;
    $EaseInOutElastic( t ): number;
    $EaseInBack( t ): number;
    $EaseOutBack( t ): number;
    $EaseInOutBack( t ): number;
    $EaseInBounce( t ): number;
    $EaseOutBounce( t ): number;
    $EaseInOutBounce( t ): number;
    $EaseInWave( t ): number;
    $EaseOutWave( t ): number;
    $EaseOutJump( t ): number;
    $EaseInJump( t ): number;
}

declare class $JssorSlider$ {
    constructor( container: string, options: any );

    public $Elmt: HTMLElement;

	/**
	* Go to the specifed slide immediately with no play.
	*/
    $GoTo( slideIndex: number );
	/**
	* Play the slider to next slide.
	*/
    $Next();
	/**
	* Play the slider to previous slide.
	*/
    $Prev();
	/**
	* Pause the slider, prevent it from auto playing.
	*/
    $Pause();
	/**
	* Start auto play if the slider is currently paused.
	*/
    $Play();
	/**
	* Reset slideshow transitions for the slider.
	*/
    $SetSlideshowTransitions( transitions );
	/**
	* Reset caption transitions for the slider.
	*/
    $SetCaptionTransitions( transitions );
	/**
	* Retrieve slides count of the slider.
	*/
    $SlidesCount(): number;
	/**
	* Retrieve current slide index of the slider.
	*/
    $CurrentIndex(): number;
	/**
	* Retrieve auto play status of the slider.
	*/
    $IsAutoPlaying(): boolean;
	/**
	* Retrieve drag status of the slider.
	*/
    $IsDragging(): boolean;
	/**
	* Retrieve right<-->left sliding status of the slider.
	*/
    $IsSliding(): boolean;
	/**
	* Retrieve mouse over status of the slider.
	*/
    $IsMouseOver(): boolean;
	/**
	* Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
	*/
    $LastDragSucceded(): number;

    $OriginalWidth(): number;
    $OriginalHeight(): number;

	/**
	* Scale the slider to new height and keep aspect ratio.
	*/
    $ScaleHeight( height?: number ): number;

	/**
	* Scale the slider to new width and keep aspect ratio.
	*/
    $ScaleWidth( width?: number ): number;
}

declare class $JssorCaptionSlideo$ {
    constructor( container, captionSlideOptions: any, playIn );
}

declare var $JssorBulletNavigator$: any;
declare var $JssorThumbnailNavigator$: any;
declare var $JssorArrowNavigator$: any;
declare var $JssorSlideshowRunner$: any;
declare var $JssorEasing$: JssorEasings;
declare var $JssorSlideshowFormations$: any;