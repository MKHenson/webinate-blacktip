module blacktip
{
    'use strict';

    /**
    * Controller for managing the 
    */
    export class SimpleCtrl
    {
        public static $inject = ["signaller", "meta", "scrollTop"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(signaller: any, meta: Meta, scrollTop: Function)
        {
            meta.defaults();
            scrollTop();
            signaller();
        }
    }
}