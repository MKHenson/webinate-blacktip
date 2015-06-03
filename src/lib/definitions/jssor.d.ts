interface JssorEasings
{
	$EaseLinear(t): number;
	$EaseGoBack(t): number;
	$EaseSwing(t): number;
	$EaseInQuad(t): number;
	$EaseOutQuad(t): number;
	$EaseInOutQuad(t): number;
	$EaseInCubic(t): number;
	$EaseOutCubic(t): number;
	$EaseInOutCubic(t): number;
	$EaseInQuart(t): number;
	$EaseOutQuart(t): number;
	$EaseInOutQuart(t): number;
	$EaseInQuint(t): number;
	$EaseOutQuint(t): number;
	$EaseInOutQuint(t): number;
	$EaseInSine(t): number;
	$EaseOutSine(t): number;
	$EaseInOutSine(t): number;
	$EaseInExpo(t): number;
	$EaseOutExpo(t): number;
	$EaseInOutExpo(t): number;
	$EaseInCirc(t): number;
	$EaseOutCirc(t): number;
	$EaseInOutCirc(t): number;
	$EaseInElastic(t): number;
	$EaseOutElastic(t): number;
	$EaseInOutElastic(t): number;
	$EaseInBack(t): number;
	$EaseOutBack(t): number;
	$EaseInOutBack(t): number;
	$EaseInBounce(t): number;
	$EaseOutBounce(t): number;
	$EaseInOutBounce(t): number;
	$EaseInWave(t): number;
	$EaseOutWave(t): number;
	$EaseOutJump(t): number;
	$EaseInJump(t): number;
}


interface ICaptionTransitions
{
	$Duration?: number;
	x?: number;
	y?: number;
	$Easing: {
		$Left?: (n: number) => number;
		$Top?: (n: number) => number;
		$Zoom?: (n: number) => number;
		$Clip?: (n: number) => number;
		$Opacity?: (n: number) => number;
		$Rotate?: (n: number) => number;
	};
	$Round?: { $Rotate: number; };
	$Opacity?: number;
	$Clip?: number;
	$Move?: boolean;
	$Cols?: number;
	$Rows?: number;
}


interface ISlideshowTransitions
{
	$Duration?: number;
	x?: number;
	y?: number;
	$Delay?: number;
	$Zoom?: number;
	$Rotate?: number;
	$Rows?: number;
	$Cols?: number;
	$Shift?: number;
	$SlideOut?: boolean;
	$During?: { $Left?: Array<number>; $Top?: Array<number>; $Rotate?: Array<number>; $Zoom?: Array<number>; };
	$ChessMode?: { $Column?: number; $Row?: number; };
	$Formation?: (n: number) => number;
	$Assembly?: number;
	$Easing?: {
		$Zoom?: (n: number) => number;
		$Left?: (n: number) => number;
		$Top?: (n: number) => number;
		$Rotate?: (n: number) => number;
		$Opacity?: (n: number) => number;
	};
	$Opacity?: number;
	$ZIndex?: number;
	$Outside?: boolean;
	$Round?: { $Top?: number; $Left?: number; $Rotate?: number; };
	$Brother?: ISlideshowTransitions;
}


interface ISliderOptions
{
	/**[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0*/
	$FillMode?: number;
	/**[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false*/
	$AutoPlay?: boolean;
	/**[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000*/
	$AutoPlayInterval?: number;
	/**[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1*/
	$PauseOnHover?: number;

	/**[Optional] Allows keyboard (arrow key) navigation or not, default value is false*/
	$ArrowKeyNavigation?: boolean;
	/**[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad*/
	$SlideEasing?: (n: number) => number;
	/**[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500*/
	$SlideDuration?: number;
	/**[Optional] Minimum drag offset to trigger slide , default value is 20*/
	$MinDragOffsetToSlide?: number;
	/**[Optional] Width of every slide in pixels, default value is width of 'slides' container*/
	$SlideWidth?: number;
	/**[Optional] Height of every slide in pixels, default value is height of 'slides' container*/
	$SlideHeight?: number;
	/**[Optional] Space between each slide in pixels, default value is 0*/
	$SlideSpacing?: number;
	/**[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1*/
	$DisplayPieces?: number;
	/**[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.*/
	$ParkingPosition?: number;
	/**[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).*/
	$UISearchMode?: number;
	/**[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1*/
	$PlayOrientation?: number;
	/**[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)*/
	$DragOrientation?: number;

	/** [Optional] Options to specify and enable slideshow or not */
	$SlideshowOptions?: {
		/**[Required] Class to create instance of slideshow*/
		$Class: any;
		/**[Required] An array of slideshow transitions to play slideshow*/
		$Transitions: Array<ISlideshowTransitions>;
		/**[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random*/
		$TransitionsOrder?: number;
		/**[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false*/
		$ShowLink?: boolean;
	};
	

	/**[Optional] Options which specifies how to animate caption*/
	$CaptionSliderOptions?: {
		/**[Required] Class to create instance to animate caption*/
		$Class: any;
		/**[Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder*/
		$CaptionTransitions: Array<ICaptionTransitions>;
		/**[Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1*/
		$PlayInMode?: number;
		/**[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1*/
		$PlayOutMode?: number;
	};

	/**[Optional] Options to specify and enable navigator or not*/
	$BulletNavigatorOptions: {                                
		/**[Required] Class to create navigator instance*/
		$Class: any;
		/**[Required] 0 Never, 1 Mouse Over, 2 Always*/
		$ChanceToShow: number;
		/**[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0*/
		$AutoCenter?: number;
		/**[Optional] Steps to go for each navigation request, default value is 1*/
		$Steps?: number;                                      
		/**[Optional] Specify lanes to arrange items, default value is 1*/
		$Lanes?: number;                                      
		/**[Optional] Horizontal space between each item in pixel, default value is 0*/
		$SpacingX?: number;                                   
		/**[Optional] Vertical space between each item in pixel, default value is 0*/
		$SpacingY?: number;                                   
		/**[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1*/
		$Orientation?: number;                                
	};

	/**[Optional] Options to specify and enable arrow navigator or not*/
	$ArrowNavigatorOptions?:
	{
		/**[Requried] Class to create arrow navigator instance*/
		$Class: any;
		/**[Required] 0 Never, 1 Mouse Over, 2 Always*/
		$ChanceToShow: number;
		/**[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0*/
		$AutoCenter?: number;
		/**[Optional] Steps to go for each navigation request, default value is 1 */
		$Steps?: number;
	};
}

declare class $JssorSlider$
{
	constructor(container: string, options: ISliderOptions);

	public $Elmt: HTMLElement;

	/**
	* Go to the specifed slide immediately with no play.
	*/
	$GoTo(slideIndex: number);
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
	$SetSlideshowTransitions(transitions);
	/**
	* Reset caption transitions for the slider.
	*/
	$SetCaptionTransitions(transitions);
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
	$ScaleHeight(height?: number): number;

	/**
	* Scale the slider to new width and keep aspect ratio.
	*/
	$ScaleWidth(width?: number): number;
}

declare class $JssorCaptionSlider$
{
	constructor(container, captionSlideOptions: ISliderOptions, playIn);
} 

declare class JssorSlideshowFormations
{
	$FormationStraight(transition: number): number;
	$FormationSwirl(transition: number): number;
	$FormationZigZag(transition: number): number;
	$FormationStraightStairs(transition: number): number;
	$FormationSquare(transition: number): number;
	$FormationRectangle(transition: number): number;
	$FormationRandom(transition: number): number;
	$FormationCircle(transition: number): number;
	$FormationCross(transition: number): number;
	$FormationRectangleCross(transition: number): number;
}

declare var $JssorBulletNavigator$: any;
declare var $JssorThumbnailNavigator$: any;
declare var $JssorArrowNavigator$: any;
declare var $JssorSlideshowRunner$: any;
declare var $JssorEasing$: JssorEasings;
declare var $JssorSlideshowFormations$: JssorSlideshowFormations;