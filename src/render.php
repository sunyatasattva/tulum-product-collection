<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$currency_symbol = get_woocommerce_currency_symbol( get_woocommerce_currency() );
$page_number = (int) ( $_GET['page_num'] ?? 1 );

$query = array(
	"paginate" => true,
	"page" => $page_number,
);

$response = wc_get_products( $query );
$products = $response->products;
$max_num_pages = $response->max_num_pages;

$wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?= $wrapper_attributes; ?> data-wp-interactive="tulum-product-collection">
	<div data-wp-router-region="tulum-product-collection">
		<ul class="products display-as-<?= $attributes['layout'] ?>">
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
		<nav class="pagination">
			<ul class="pagination__pages">
				<?php for ( $i = 1; $i <= $max_num_pages; $i++ ): ?>
					<li class="pagination__page">
						<?php if ( $i === $page_number ): ?>
							<span class="pagination__page--is-active"><?= $i; ?></span>
						<?php else: ?>
							<a
								class="pagination__page--link"
								href="?page_num=<?= $i; ?>"
								data-wp-on--click="actions.navigate"
							>
								<?= $i; ?>
							</a>
						<?php endif; ?>
					</li>
				<?php endfor; ?>
			</ul>
		</nav>
	</div>
</div>
