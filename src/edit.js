/**
 * External dependencies
 */

import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Ideally, we would import this from `@woocommerce/data`. Unfortunately, there
 * are some conflicting peer dependencies right now, so we'll just hard-code this.
 */
const PRODUCTS_STORE = "wc/admin/products";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps();
	const products = useSelect( ( select ) => {
		const { getProducts } = select( PRODUCTS_STORE );

		return getProducts({});
	}, [] );

	if ( !products ) {
		return <div {...blockProps}>Loading…</div>;
	}

	return (
	<>
		<div { ...blockProps }>
			<ul className="products">
				{ products.map( ( product ) => (
					<li className="product" key={ product.slug }>
						<article>
							<h1 className="product__name">{ product.name }</h1>
						</article>
					</li>
				) ) }
			</ul>
		</div>
	</>
	);
}
