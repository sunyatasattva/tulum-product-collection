/**
 * The JavaScript code loaded in the front-end.
 */

import { store, getElement } from "@wordpress/interactivity";
import { actions } from "@wordpress/interactivity-router";

store( "tulum-product-collection", {
	actions: {
		*navigate( event ) {
			event.preventDefault();

			const { ref } = getElement();
			console.log(ref.href);
			yield actions.navigate( ref.href );
		},
	},
} );
