/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { 
		link, 
		iconSlug,
		size, 
		siteName,
		colorScheme,
	} = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps } style={{ height: `${size}px` }}>
			<a 
				href={ link.url } 
				title={ siteName }
				target={ link.openInNewTab ? "_blank" : "_self" } 
				rel={ link.openInNewTab ? "noopener noreferrer" : "noopener" }
			>
				{ 
					(iconSlug == "unset") ? (
						<img />
					) : (iconSlug == "invalid") ? (
						<img />
					) :	(
						<img src={`${pluginInfo.path}assets/${colorScheme}/${iconSlug}-${colorScheme}.png`} alt={siteName} />
					) 
				}
			</a>
		</div>
	);
}