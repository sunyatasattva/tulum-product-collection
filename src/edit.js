/**
 * External dependencies
 */

import { BlockControls, InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { ToolbarGroup, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { list, grid } from "@wordpress/icons";

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

const PaginationItem = ({ page }) => {
	if ( !page ) return (
		<span className="pagination__page--more">…</span>
	);

	return page === 1 ? (
		<span className="pagination__page--is-active">{ page }</span>
	) : (
		<a href="#" className="pagination__page--link">{ page }</a>
	)
};

const ToolbarControls = ({ layout, setAttributes }) => {
	const displayLayoutControls = [
		{
			icon: list,
			title: __( "List view", "tulum-product-collection" ),
			onClick: () => setAttributes({ layout: "list" }),
			isActive: layout === "list",
		},
		{
			icon: grid,
			title: __( "Grid view", "tulum-product-collection" ),
			onClick: () => setAttributes({ layout: "grid" }),
			isActive: layout === "grid",
		},
	];

	return (
		<BlockControls>
			<ToolbarGroup controls={displayLayoutControls} />
		</BlockControls>
	);
};

const FeaturedControl = ({ featured, setAttributes }) => (
	<InspectorControls>
		<ToggleControl
			checked={ featured }
			label="Show only featured products"
			onChange={ ( value ) => setAttributes( { featured: value } ) }
		/>
	</InspectorControls>
);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { layout, featured } = attributes;
	const blockProps = useBlockProps();
	const currencySymbol = wcSettings?.currency?.symbol || "";
	const products = useSelect( ( select ) => {
		const { getProducts } = select( PRODUCTS_STORE );

		return getProducts({ featured });
	}, [ featured ] );

	if ( !products ) {
		return <div { ...blockProps }>{ __( "Loading…", "tulum-product-collection" ) }</div>;
	}

	return (
	<>
		<div { ...blockProps }>
			<ul className={ `products display-as-${ layout }` }>
				{ products.map( ( { images, name, price, slug } ) => (
					<li className="product" key={ slug }>
						<article>
							<img src={ images?.[0]?.src } className="product__image" />
							<h1 className="product__name">{ name }</h1>
							<div className="product__details">
								<span className="product__price">{ currencySymbol } { price }</span>
							</div>
						</article>
					</li>
				) ) }
			</ul>
			<nav className="pagination">
				<ul className="pagination__pages">
					{ [ 1, 2, 3, 4, null, 9 ].map( ( page ) => (
						<li className="pagination__page" key={ page }>
							<PaginationItem page={ page } />
						</li>
					) )}
				</ul>
			</nav>
		</div>
		<ToolbarControls layout={ layout } setAttributes={ setAttributes } />
		<FeaturedControl featured={ featured } setAttributes={ setAttributes } />
	</>
	);
}
