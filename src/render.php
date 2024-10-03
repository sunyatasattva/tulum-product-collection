<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$currency_symbol = get_woocommerce_currency_symbol( get_woocommerce_currency() );
$products = wc_get_products( array() );

$wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?= $wrapper_attributes; ?>>
	<ul class="products">
		<?php foreach ($products as $product):
			$data = $product->get_data();
		?>
			<li class="product">
				<article>
					<img
						src="<?= wp_get_attachment_url( $data['image_id'] ); ?>"
						class="product__image"
					>
					<h1 class="product__name"><?= $data['name']; ?></h1>
					<div class="product__details">
						<span class="product__price"><?= $currency_symbol . $data['price']; ?></span>
					</div>
				</article>
			</li>
		<?php endforeach; ?>
	</ul>
</div>
