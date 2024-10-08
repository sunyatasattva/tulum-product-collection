const collection = {
	name: "tulum-product-collection/product-collection/on-sale-cheaper-than-40",
	title: "On Sale & Cheap",
	icon: "games",
	description: "Example collection of products. They are on sale and cheaper than $40 (or your local currency)!",
	keywords: ["cheap", "product collection"],
};

const attributes = {
	query: {
		perPage: 3,
		pages: 0,
		woocommerceOnSale: true,
		priceRange: {
			max: 40
		}
	}
};

const innerBlocks = [
    [
      "core/heading",
      {
        textAlign: "center",
        level: 2,
        content: "On Sale & Cheap",
      },
    ],
    [
      "woocommerce/product-template",
      {},
      [
        ["woocommerce/product-image"],
        [
          "woocommerce/product-price",
          {
            textAlign: "center",
            fontSize: "small",
          },
        ],
      ],
    ],
		[
			"core/query-pagination",
			{},
		],
  ];

window.wc.wcBlocksRegistry.__experimentalRegisterProductCollection( {
	...collection,
	attributes,
	innerBlocks
} );
