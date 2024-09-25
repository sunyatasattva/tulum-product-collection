# Woo DM Product Collection Workshop

---
Contributors:      Karol Manijak <karol.manijak@a8c.com>, Lucio Giannotta <lucio.giannotta@a8c.com>
Tags:              block, tutorial
Tested up to:      6.6
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
---

Repository for the demo/code-along to learn how to build blocks with WooCommerce.

## Description

This repository is designed to be a helpful tool to follow along with a step-by-step code example of the implementation of an MVP of the WooCommerce “Product Collection” block.

We chose this block because it exemplifies many of the features that a block developer trying to build for WooCommerce might want to deal with.

## Installation

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/woo-dm-product-collection` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

## Development

### Notes

The skeleton of this plugin was scaffolded with the [`@wordpress/create-block`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) package. However, the scaffold produced directly by that package is insufficient for the purpose of the advanced steps of this workshop, in particular the steps integrating the [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/).

For this reason, the main modification needed is to ensure support for JavaScript modules:

1. `package.json` file calls `wp-scripts build` and `start` with the `--experimental-modules` argument.
2. `src/block.json` uses `viewScriptModule` instead of `viewScript`.

In combination, these two modifications ensure that the built files are compatible with the Interactivity API runtime.
