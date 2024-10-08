<?php
/**
 * Plugin Name:       Woo DM Tulum Product Collection Workshop
 * Description:       Repository for the demo/code-along to learn how to build blocks with WooCommerce.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Karol Manijak, Lucio Giannotta
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tulum-product-collection
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_tulum_product_collection_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_tulum_product_collection_block_init' );

function enqueue_my_custom_product_collection_script() {
    wp_enqueue_script(
        'tulum-product-collection',
        plugins_url( __DIR__ . '/src/register-new-collection.js', __FILE__ ),
        array( 'wc-settings', 'wc-blocks-registry' ),
        10
    );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_my_custom_product_collection_script' );
