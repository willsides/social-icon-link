<?php
/**
 * Plugin Name:       Social Icon Link
 * Plugin URI:        https://github.com/willsides/social-icon-link
 * Description:       Another block to add a logo that links to a social media account
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Will Sides
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       social-icon-link
 *
 * @package           willsides
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function willsides_social_icon_link_block_init() {
    wp_register_script(
        'willsides-social-icon-link-editor-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );

    wp_localize_script(
        'willsides-social-icon-link-editor-script',
        'pluginInfo',
        array( 'path' => plugin_dir_url( __FILE__ ) )
    );

	register_block_type( 
		__DIR__ . '/build' ,
		array(
			'editor_script' => 'willsides-social-icon-link-editor-script', 
		)
	);
}
add_action( 'init', 'willsides_social_icon_link_block_init' );
